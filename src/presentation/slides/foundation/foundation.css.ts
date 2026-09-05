import { style } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';
export const statement = style({
  maxWidth: '1000px',
  margin: '0 auto',
  textAlign: 'center',
  fontSize: 'clamp(1.8rem, 4vw, 4rem)',
  fontWeight: 450,
  lineHeight: 1.35,
  letterSpacing: '-0.04em',
  textWrap: 'balance',
});
export const accent = style({ color: tokens.color.accent });
