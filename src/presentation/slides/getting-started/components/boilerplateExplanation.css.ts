import { keyframes, style } from '@vanilla-extract/css';

const reveal = keyframes({
  from: { opacity: 0, visibility: 'hidden', transform: 'translateY(6px)' },
  to: { opacity: 1, visibility: 'visible', transform: 'translateY(0)' },
});

export const chunk = style({
  display: 'inline-block',
  animation: `${reveal} 400ms ease-out both`,
  '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
});
