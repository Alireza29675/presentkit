import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../../../theme/tokens.css.ts';
import { introTiming } from '../steps/timing.ts';

const reveal = keyframes({
  from: { opacity: 0, visibility: 'hidden', transform: 'translateY(8px)' },
  to: { opacity: 1, visibility: 'visible', transform: 'translateY(0)' },
});
const delayMs = introTiming.delayMs + introTiming.durationMs + introTiming.hintGapMs;

export const hint = style({
  position: 'absolute',
  top: 'calc(50% + clamp(76px, 7vw, 108px))',
  left: 0,
  width: '100%',
  padding: '0 1.5rem',
  textAlign: 'center',
  color: tokens.color.muted,
  animation: `${reveal} 700ms ${delayMs}ms ease-out both`,
  '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
});
export const question = style({
  margin: '0 0 20px',
  fontSize: 'clamp(0.85rem, 1.25vw, 1.1rem)',
  lineHeight: 1.5,
});
export const keyPrompt = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  margin: 0,
  fontSize: '0.7rem',
});
export const key = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '32px',
  padding: '10px 15px 12px',
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '8px',
  background: 'linear-gradient(180deg, #202630, #151a22)',
  boxShadow: '0 3px 0 #080b10, inset 0 1px 0 #ffffff08',
  color: tokens.color.text,
  fontFamily: tokens.font.body,
  fontSize: '0.75rem',
});
export const keySymbol = style({ color: tokens.color.muted, fontSize: '1rem' });
