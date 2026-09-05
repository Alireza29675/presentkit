import { globalStyle } from '@vanilla-extract/css';
import { tokens } from './tokens.css.ts';

globalStyle('*, *::before, *::after', { boxSizing: 'border-box' });
globalStyle('html, body, #root', {
  margin: 0,
  width: '100%',
  minHeight: '100%',
});
globalStyle('button, input, select, textarea', { font: 'inherit' });
globalStyle(
  'button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible',
  {
    outline: `3px solid ${tokens.color.accent}`,
    outlineOffset: '5px',
  },
);
