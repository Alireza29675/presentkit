import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../theme/tokens.css.ts';

const reveal = keyframes({
  from: { opacity: 0, visibility: 'hidden', transform: 'translateY(4px)' },
  to: { opacity: 1, visibility: 'visible', transform: 'translateY(0)' },
});
export const prompt = style({
  position: 'absolute',
  bottom: '24px',
  left: 0,
  width: '100%',
  margin: 0,
  textAlign: 'center',
  color: tokens.color.muted,
  fontSize: '0.75rem',
  animation: `${reveal} 250ms ease-out both`,
  '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
});

export const gate = style({
  selectors: { '&[data-ready="false"]': { opacity: 0 } },
});
