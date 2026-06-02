'use client';

import { useState } from 'react';
import RiggedGlyph from './RiggedGlyph';

// ShareReview — surfaces the client review link + how many mark-backs have come in.
export default function ShareReview({ slug, marksCount }: { slug: string; marksCount: number }) {
  const [copied, setCopied] = useState(false);
  const path = `/universes/${slug}/review`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — link is shown for manual copy */
    }
  };

  return (
    <div className="sketch-border flex flex-col gap-2 p-4">
      <span className="handwritten text-ink flex items-center gap-2 text-base">
        <RiggedGlyph pattern="portal" size={20} /> client review link
      </span>
      <code className="handwritten text-pencil break-all text-sm">{path}</code>
      <div className="flex flex-wrap gap-2">
        <a href={path} target="_blank" rel="noopener noreferrer" className="sketch-button text-sm">
          open
        </a>
        <button type="button" onClick={copy} className="sketch-button text-sm">
          {copied ? 'copied ✓' : 'copy link'}
        </button>
      </div>
      <span className="handwritten text-pencil text-xs">
        {marksCount} mark-back{marksCount === 1 ? '' : 's'} received
      </span>
    </div>
  );
}
