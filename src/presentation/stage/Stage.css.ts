import { style } from '@vanilla-extract/css';
import { tokens } from '../theme/tokens.css.ts';

export const stage = style({
  width: '100%',
  minHeight: `calc(100dvh - ${tokens.layout.controlsHeight})`,
  isolation: 'isolate',
});
