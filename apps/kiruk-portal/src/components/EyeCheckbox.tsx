'use client';

import RiggedGlyph from './RiggedGlyph';

// EyeCheckbox — the eye IS the checkbox. Shut = unchecked (not seeing it), open = checked
// (acknowledged). Keyboard + ARIA correct. Toggle and EyeCheckbox share the same metaphor:
// attention = on.

export default function EyeCheckbox({
  checked,
  onCheckedChange,
  label,
  pattern = 'star',
  size = 30,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label: string;
  pattern?: 'solid' | 'star' | 'ring' | 'portal';
  size?: number;
  disabled?: boolean;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: intentional — an eye-styled toggle; button + role=checkbox + aria-checked is keyboard- and SR-accessible
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className="eye-check handwritten text-ink inline-flex items-center gap-2.5 text-lg"
    >
      <RiggedGlyph pattern={pattern} open={checked} size={size} blink={checked} />
      <span style={{ opacity: checked ? 1 : 0.55 }}>{label}</span>
    </button>
  );
}
