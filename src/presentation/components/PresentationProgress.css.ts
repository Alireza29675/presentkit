import { style } from '@vanilla-extract/css';
import { tokens } from '../theme/tokens.css.ts';

export const footer = style({
  minHeight: '40px',
});

export const track = style({
  height: '2px',
  overflow: 'hidden',
  background: tokens.color.border,
});

export const fill = style({
  height: '100%',
  background: tokens.color.accent,
  transition: `width ${tokens.motion.normal} ${tokens.motion.easing}`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});

export const hint = style({
  margin: 0,
  padding: '12px 16px',
  textAlign: 'center',
  fontSize: '0.65rem',
  lineHeight: '14px',
  color: tokens.color.muted,
});
