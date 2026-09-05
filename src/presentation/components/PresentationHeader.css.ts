import { style } from '@vanilla-extract/css';
import { tokens } from '../theme/tokens.css.ts';

export const header = style({
  height: '64px',
  padding: '0 clamp(1.5rem, 3vw, 3rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
});
export const brand = style({
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '-0.025em',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});
export const brandMark = style({
  display: 'grid',
  placeItems: 'center',
  width: '23px',
  height: '23px',
  background: tokens.color.accent,
  color: '#14200d',
  borderRadius: '5px',
  fontSize: '0.85rem',
});
export const sourceLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.75rem',
  color: tokens.color.muted,
  textDecoration: 'none',
  selectors: { '&:hover': { color: tokens.color.text } },
});
