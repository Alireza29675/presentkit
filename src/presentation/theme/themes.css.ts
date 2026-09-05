import { createTheme, style } from '@vanilla-extract/css';
import { tokens } from './tokens.css.ts';
import { darkThemeValues, lightThemeValues } from './themeValues.ts';

export const defaultTheme = createTheme(tokens, lightThemeValues);
export const darkTheme = createTheme(tokens, darkThemeValues);

export const themeRoot = style({
  minHeight: '100dvh',
  backgroundColor: tokens.color.canvas,
  color: tokens.color.text,
  fontFamily: tokens.font.body,
  fontSize: tokens.fontSize.body,
  fontSynthesis: 'none',
});
