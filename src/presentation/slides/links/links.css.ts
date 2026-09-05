import { style } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';
export const address = style({
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '18px',
  overflow: 'hidden',
  background: tokens.color.surface,
});
export const browserBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1.2rem',
  color: tokens.color.muted,
  fontSize: '0.75rem',
  borderBottom: `1px solid ${tokens.color.border}`,
});
export const url = style({
  padding: '3rem 2rem',
  fontFamily: 'monospace',
  fontSize: 'clamp(1.3rem, 2.8vw, 2.8rem)',
  lineHeight: 1.6,
});
export const legend = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '0 2rem 2rem',
  color: tokens.color.muted,
  fontSize: '0.75rem',
});
export const bookmark = style({
  background: '#d1f67a',
  color: '#14200d',
  padding: '1rem 2rem',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
});
export const note = style({
  color: tokens.color.muted,
  fontSize: '0.75rem',
  marginTop: '1.5rem',
});
