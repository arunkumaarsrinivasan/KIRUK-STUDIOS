#!/usr/bin/env python3
"""
SKI agent liveness + project auto-bind.

The ski skill backgrounds this when the voice loop starts. It connects
to the widget's ONE global Unix socket (~/.ski/agents.sock) and
announces the project it's running in. Two things happen:

  1. AUTO-BIND — the widget binds the announced project, so a session
     started in ANY folder appears in the widget's project list without
     the user having to pick it in the pill/notch first.
  2. LIVENESS  — the open connection is "connected" (green dot). When
     this process exits (the agent's shell dies), the kernel closes the
     socket, the widget sees EOF, and the dot greys — instantly, no
     polling, no token cost.

The loop RECONNECTS: if the widget isn't up yet, or restarts, this keeps
trying; the project pops into the list the moment the widget is
available, and the dot recovers on its own after a restart.

Lifetime: the script exits when the anchor process dies. Anchor it to
something that lives exactly as long as the voice loop — the skill runs
it INSIDE the Monitor's shell command, so `$$` is the monitor shell,
which the harness kills when the loop stops.

Args:
    sys.argv[1] — absolute path to the global socket (~/.ski/agents.sock)
    sys.argv[2] — absolute path to the project root ($PWD)
    sys.argv[3] — PID of the anchor process to follow
"""

import json
import os
import socket
import sys
import time


PARENT_CHECK_TICK_S = 5    # how often to re-check the anchor while holding
RECONNECT_DELAY_S = 2      # pause between (re)connect attempts

# This script lives INSIDE the skill folder, so its own location tells
# the widget where the install is — used to keep the skill files current
# after app updates (Phase AS), for any install location.
SKILL_DIR = os.path.dirname(os.path.abspath(__file__))


if sys.platform == "win32":
    import ctypes

    _PROCESS_QUERY_LIMITED_INFORMATION = 0x1000
    _STILL_ACTIVE = 259

    def parent_alive(pid: int) -> bool:
        # Windows: os.kill(pid, 0) is NOT a liveness probe on CPython —
        # signal 0 is unsupported and the call raises (WinError 87), so the
        # POSIX idiom below reports EVERY parent as dead and the heartbeat
        # exits instantly (the dot never goes green). Query the process
        # object directly instead. NOTE: `pid` must be a real Windows PID;
        # under Git Bash the launcher passes /proc/$$/winpid, not the MSYS
        # `$$` (see SKILL.md's run recipe).
        k32 = ctypes.windll.kernel32
        h = k32.OpenProcess(_PROCESS_QUERY_LIMITED_INFORMATION, False, int(pid))
        if not h:
            return False
        try:
            code = ctypes.c_ulong()
            ok = k32.GetExitCodeProcess(h, ctypes.byref(code))
            return bool(ok) and code.value == _STILL_ACTIVE
        finally:
            k32.CloseHandle(h)
else:
    def parent_alive(pid: int) -> bool:
        try:
            os.kill(pid, 0)
            return True
        except PermissionError:
            # The pid exists but belongs to another user — still alive.
            return True
        except (ProcessLookupError, OSError):
            return False


def _make_connection(sock_path: str):
    """Open the rendezvous connection. Unix (macOS / Linux): the
    AF_UNIX socket at `sock_path`. Windows: CPython has no
    socket.AF_UNIX, so the widget listens on localhost TCP instead and
    writes the port to `agents.port` next to where agents.sock would
    live — read it and connect there. Raises OSError-family on any
    failure (caller retries)."""
    if hasattr(socket, "AF_UNIX"):
        s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        s.settimeout(2.0)
        s.connect(sock_path)
        return s
    port_file = os.path.join(os.path.dirname(sock_path), "agents.port")
    with open(port_file) as f:
        port = int(f.read().strip())
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(2.0)
    s.connect(("127.0.0.1", port))
    return s


def hold_socket(sock_path: str, project_root: str, anchor_pid: int) -> bool:
    """Connect once, announce the project, and hold until the peer
    closes or the anchor dies. Returns True if a connection was
    established (regardless of how it ended), False if connect failed
    (caller retries)."""
    s = None
    try:
        s = _make_connection(sock_path)
    except (FileNotFoundError, ConnectionRefusedError, ValueError, OSError):
        try:
            if s is not None:
                s.close()
        finally:
            return False

    # Announce: the widget auto-binds `project_root` and (Phase AS)
    # heals the install at `skill_dir`. One newline-terminated hello.
    try:
        s.sendall(
            (
                json.dumps(
                    {
                        "hello": "ski-heartbeat",
                        "project_root": project_root,
                        "skill_dir": SKILL_DIR,
                        "pid": os.getpid(),
                    }
                )
                + "\n"
            ).encode()
        )
    except OSError:
        try:
            s.close()
        finally:
            return False

    s.settimeout(PARENT_CHECK_TICK_S)
    try:
        while parent_alive(anchor_pid):
            try:
                data = s.recv(64)
                if not data:
                    # Widget closed the socket (restart) — reconnect.
                    break
            except socket.timeout:
                continue  # normal — just re-check the anchor
            except OSError:
                break
    finally:
        try:
            s.close()
        except OSError:
            pass
    return True


def main() -> int:
    if len(sys.argv) < 4:
        print(
            "usage: heartbeat.py <~/.ski/agents.sock> <project_root> <anchor_pid>",
            file=sys.stderr,
        )
        return 2

    sock_path = sys.argv[1]
    project_root = sys.argv[2]
    try:
        anchor_pid = int(sys.argv[3])
    except ValueError:
        print("anchor_pid must be an integer", file=sys.stderr)
        return 2

    # Guard against a self-referential anchor ($$ expanding to OUR pid
    # via an exec-ing shell): checking our own liveness would keep the
    # script alive forever. Fall back to our parent process instead.
    if anchor_pid == os.getpid() or anchor_pid <= 1:
        anchor_pid = os.getppid()
        if anchor_pid <= 1:
            print("no valid anchor process; exiting", file=sys.stderr)
            return 2

    # Reconnect-forever loop: connect, announce, hold; on any loss (or
    # while the widget is down) pause briefly and try again.
    while parent_alive(anchor_pid):
        hold_socket(sock_path, project_root, anchor_pid)
        time.sleep(RECONNECT_DELAY_S)
    return 0


if __name__ == "__main__":
    sys.exit(main())
