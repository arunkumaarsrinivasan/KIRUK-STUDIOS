'use client';

import { type InputHTMLAttributes, useId, useState } from 'react';
import RiggedGlyph from './RiggedGlyph';

// EyeField — a text input the eye WATCHES. The eye is shut while empty + unfocused, opens
// when you focus or type (it pays attention to you), blinks idly when filled. The whole
// input is a sketch socket. Drop-in for any single-line field.

export default function EyeField({
  label,
  pattern = 'ring',
  value,
  onValueChange,
  className,
  ...rest
}: {
  label: string;
  /** which eye watches this field (keep distinct per field) */
  pattern?: 'ring' | 'solid' | 'slit' | 'portal' | 'hatch' | 'star' | 'constellation';
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const awake = focused || value.length > 0;

  return (
    <div className={`sketch-border flex items-stretch ${className ?? ''}`.trim()}>
      <label
        htmlFor={id}
        className="handwritten text-pencil flex w-40 shrink-0 items-center gap-2 px-3 text-sm"
      >
        <RiggedGlyph
          pattern={pattern}
          open={awake}
          size={22}
          blink={awake}
          look={focused ? 'right' : 'center'}
        />
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="ink-block handwritten w-full px-4 py-3 text-lg outline-none"
        {...rest}
      />
    </div>
  );
}
