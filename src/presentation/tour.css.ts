import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from './theme/tokens.css.ts';

const arrive = keyframes({
  from: { opacity: 0, transform: 'translateY(12px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});
export const root = style({
  vars: {
    [tokens.color.canvas]: '#0c1017',
    [tokens.color.surface]: '#171d28',
    [tokens.color.text]: '#f4f2eb',
    [tokens.color.muted]: '#9ca6b8',
    [tokens.color.accent]: '#d1f67a',
    [tokens.color.border]: '#30394a',
    [tokens.layout.controlsHeight]: '104px',
  },
  color: tokens.color.text,
  background: tokens.color.canvas,
  minHeight: '100dvh',
});
export const slide = style({
  minHeight: `calc(100dvh - ${tokens.layout.controlsHeight})`,
  padding: 'clamp(1.5rem, 4.5vw, 4.5rem) clamp(1.5rem, 6vw, 6rem)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  animation: `${arrive} ${tokens.motion.normal} ease-out both`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
    '(max-height: 800px) and (min-width: 901px)': {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
    },
  },
});
export const eyebrow = style({
  color: tokens.color.accent,
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  margin: '0 0 1.5rem',
});
export const heading = style({
  fontFamily: tokens.font.heading,
  fontSize: 'clamp(2.6rem, 5.5vw, 5.8rem)',
  fontWeight: 500,
  lineHeight: 1.04,
  letterSpacing: '-0.055em',
  margin: 0,
  textWrap: 'balance',
});
export const body = style({
  color: tokens.color.muted,
  fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
  lineHeight: 1.65,
  maxWidth: '38em',
});
export const muted = style({ color: tokens.color.muted });
export const accent = style({ color: tokens.color.accent });
export const panel = style({
  background: tokens.color.surface,
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '18px',
});
export const button = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.7rem',
  border: '1px solid transparent',
  borderRadius: '8px',
  padding: '0.9rem 1.25rem',
  background: tokens.color.accent,
  color: '#14200d',
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'transform 160ms ease, filter 160ms ease',
  selectors: {
    '&:hover:not(:disabled)': {
      transform: 'translateY(-2px)',
      filter: 'brightness(1.06)',
    },
    '&:disabled': { opacity: 0.4, cursor: 'default' },
  },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
export const secondaryButton = style([
  button,
  {
    background: 'transparent',
    color: tokens.color.text,
    borderColor: tokens.color.border,
  },
]);
export const split = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
  gap: 'clamp(2rem, 5vw, 5rem)',
  alignItems: 'center',
  '@media': { '(max-width: 800px)': { gridTemplateColumns: '1fr' } },
});
export const header = style({
  height: '64px',
  padding: '0 clamp(1.5rem, 3vw, 3rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${tokens.color.border}`,
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
  fontSize: '0.75rem',
  color: tokens.color.muted,
  textDecoration: 'none',
  selectors: { '&:hover': { color: tokens.color.text } },
});
