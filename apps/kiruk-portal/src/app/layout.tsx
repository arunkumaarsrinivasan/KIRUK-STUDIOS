import type { Metadata } from 'next';
import { Gochi_Hand } from 'next/font/google';
import './globals.css';

// Gochi Hand — self-hosted at build (no client-side Google request). Hand/body voice.
const gochi = Gochi_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gochi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'kiruk portal — scribble proposals',
  description: 'Internal kiruk tool: run a universe from first scribble to handoff.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={gochi.variable}>
      <body>{children}</body>
    </html>
  );
}
