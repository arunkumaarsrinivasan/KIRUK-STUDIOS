/**
 * design-system/components — barrel export.
 *
 * Eye/* marks + Kirukal/Scribble. All components are React SVG, framework-agnostic,
 * zero external deps. Colors via CSS custom properties from design-system/build/css/tokens.css.
 *
 * Usage:
 *   import { EyePrimary, EyePortal, Scribble } from '@kiruk/design-system/components';
 *
 * Or direct:
 *   import { EyePrimary } from 'design-system/components/eye/EyePrimary';
 */

// Eye marks
export { EyePrimary } from './eye/EyePrimary';
export type { EyePrimaryProps } from './eye/EyePrimary';

export { EyeIris } from './eye/EyeIris';
export type { EyeIrisProps } from './eye/EyeIris';

export { EyeGaze } from './eye/EyeGaze';
export type { EyeGazeProps } from './eye/EyeGaze';

export { EyePortal } from './eye/EyePortal';
export type { EyePortalProps } from './eye/EyePortal';

export { EyeConstellation } from './eye/EyeConstellation';
export type { EyeConstellationProps } from './eye/EyeConstellation';

// Kirukal
export { Scribble } from './kirukal/Scribble';
export type { ScribbleProps } from './kirukal/Scribble';
