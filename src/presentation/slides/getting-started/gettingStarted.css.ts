import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';
import { introTiming } from './steps/timing.ts';

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
  transition: 'top 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
  selectors: { [`${slide}[data-expanded="true"] &`]: { top: '23%' } },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
const titleArrival = keyframes({
  from: {
    opacity: 0,
    transform:
      'perspective(1000px) translateY(28px) rotateX(14deg) rotateY(-5deg) scale(0.92)',
  },
  to: {
    opacity: 1,
    transform:
      'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg) scale(1)',
  },
});

// Separate from the heading's position so advancing can move it up mid-entrance.
export const titleEntrance = style({
  display: 'block',
  transformOrigin: '50% 70%',
  selectors: {
    '&[data-animate="true"]': {
      animation: `${titleArrival} ${introTiming.durationMs}ms ${introTiming.delayMs}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      selectors: { '&[data-animate="true"]': { animation: 'none' } },
    },
  },
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
