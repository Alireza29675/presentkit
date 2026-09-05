import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';

const appear = keyframes({
  from: { opacity: 0, transform: 'translateY(6px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});
export const slide = style({
  position: 'relative',
  minHeight: `max(600px, calc(100dvh - ${tokens.layout.controlsHeight}))`,
  overflow: 'hidden',
});
export const title = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  width: '100%',
  margin: 0,
  padding: '0 1.5rem',
  textAlign: 'center',
  fontSize: 'clamp(1.8rem, 3.4vw, 3.4rem)',
  fontFamily: tokens.font.heading,
  fontWeight: 450,
  lineHeight: 1.25,
  letterSpacing: '-0.04em',
  transform: 'translateY(-50%)',
  transition: 'top 700ms cubic-bezier(0.22, 1, 0.36, 1)',
  selectors: { [`${slide}[data-expanded="true"] &`]: { top: '23%' } },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
export const accent = style({ color: tokens.color.accent });
export const story = style({
  position: 'absolute',
  top: '38%',
  left: 0,
  width: '100%',
  opacity: 0,
  transition: 'opacity 400ms ease',
  selectors: { [`${slide}[data-expanded="true"] &`]: { opacity: 1 } },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
export const caption = style({
  color: tokens.color.muted,
  textAlign: 'center',
  fontSize: 'clamp(1rem, 1.7vw, 1.5rem)',
  lineHeight: 1.5,
  margin: '0 auto',
  padding: '0 1.5rem',
  maxWidth: '760px',
  minHeight: '3em',
  animation: `${appear} 350ms ease both`,
  '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
});
