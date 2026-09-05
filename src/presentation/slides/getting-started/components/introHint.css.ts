import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../../../theme/tokens.css.ts';
import { introTiming } from '../steps/timing.ts';

const reveal = keyframes({
  from: { opacity: 0, visibility: 'hidden', transform: 'translateY(4px)' },
  to: { opacity: 1, visibility: 'visible', transform: 'translateY(0)' },
});

export const hint = style({
  position: 'absolute',
  top: 'calc(50% + clamp(112px, 10vw, 152px))',
  left: 0,
  width: '100%',
  padding: '0 1.5rem',
  textAlign: 'center',
  color: tokens.color.muted,
  animation: `${reveal} 250ms ${introTiming.hintDelayMs}ms ease-out both`,
  '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
});
export const question = style({
  margin: '0 0 8px',
  fontSize: 'clamp(0.85rem, 1.25vw, 1.1rem)',
  lineHeight: 1.5,
});
export const keyPrompt = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '9px',
  margin: 0,
  fontSize: '0.7rem',
});
export const key = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '88px',
  height: '25px',
  padding: '0 12px 2px',
  border: '1px solid #484a4f',
  borderRadius: '5px',
  background: 'linear-gradient(180deg, #34363b, #282a2e)',
  boxShadow: '0 2px 0 #17181b, inset 0 1px 0 #ffffff12, inset 0 -2px 0 #00000025',
  color: '#c3c4c7',
  fontFamily: tokens.font.body,
  fontSize: '0.65rem',
});
