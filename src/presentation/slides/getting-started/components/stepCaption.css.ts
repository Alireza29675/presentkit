import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../../../theme/tokens.css.ts';

const reveal = keyframes({
  from: { opacity: 0, visibility: 'hidden', transform: 'translateY(6px)' },
  to: { opacity: 1, visibility: 'visible', transform: 'translateY(0)' },
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
});
export const chunk = style({
  display: 'inline-block',
  selectors: {
    '&[data-animate="true"]': { animation: `${reveal} 400ms ease-out both` },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      selectors: { '&[data-animate="true"]': { animation: 'none' } },
    },
  },
});
