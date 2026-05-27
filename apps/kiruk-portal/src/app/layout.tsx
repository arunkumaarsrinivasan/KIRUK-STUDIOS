import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'kiruk portal — scribble proposals',
  description: 'Internal kiruk tool: run a universe from first scribble to handoff.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
