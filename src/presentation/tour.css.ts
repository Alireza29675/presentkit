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
