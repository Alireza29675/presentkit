import { style } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';
export const center = style({
  textAlign: 'center',
  alignItems: 'center',
  background:
    'radial-gradient(ellipse at 50% 100%, #24341d 0%, transparent 65%)',
});
export const signature = style({
  marginTop: '3rem',
  color: tokens.color.muted,
  fontSize: '0.75rem',
});
