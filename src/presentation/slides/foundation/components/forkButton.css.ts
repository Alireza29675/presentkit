import { style } from '@vanilla-extract/css';
import { tokens } from '../../../theme/tokens.css.ts';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '14px',
  padding: '20px 32px',
  borderRadius: '14px',
  border: '1px solid #e3ffb0',
  background: `linear-gradient(180deg, #e0ffa1, ${tokens.color.accent})`,
  color: '#1a260f',
  boxShadow: '0 6px 24px #d1f67a14, inset 0 1px 0 #ffffff80',
  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
  fontWeight: 600,
  textDecoration: 'none',
  transition: `transform ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease`,
  selectors: {
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 36px #d1f67a25, inset 0 1px 0 #ffffff80',
    },
    '&:active': { transform: 'translateY(0)' },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
      selectors: { '&:hover': { transform: 'none' } },
    },
  },
});
