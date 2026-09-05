import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';
const float = keyframes({
  '0%,100%': { transform: 'translateY(0) rotate(-6deg)' },
  '50%': { transform: 'translateY(-8px) rotate(-3deg)' },
});
export const meta = style({
  fontSize: '0.7rem',
  color: tokens.color.muted,
  marginTop: '1.2rem',
});
export const scene = style({
  position: 'relative',
  minHeight: '450px',
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '18px',
  background: 'radial-gradient(ellipse at 50% 50%, #263126 0%, #111721 65%)',
  overflow: 'hidden',
  '@media': { '(max-width: 800px)': { minHeight: '360px' } },
});
export const sceneTop = style({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  padding: '1.3rem',
  fontSize: '0.65rem',
  color: tokens.color.muted,
});
export const liveDot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: tokens.color.accent,
});
export const orbit = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '250px',
  height: '250px',
  border: '1px solid #66774755',
  borderRadius: '50%',
  boxShadow: '0 0 0 36px #66774715, 0 0 0 72px #66774709',
  display: 'grid',
  placeItems: 'center',
});
export const core = style({ fontSize: '8rem', color: tokens.color.accent });
const note = style({
  position: 'absolute',
  zIndex: 1,
  padding: '1.25rem',
  borderRadius: '9px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  fontSize: '0.7rem',
  boxShadow: '0 12px 30px #0003',
  lineHeight: 1.4,
});
export const noteA = style([
  note,
  {
    top: '24%',
    left: '5%',
    background: '#d1f67a',
    color: '#243412',
    transform: 'rotate(-6deg)',
    animation: `${float} 4s ease-in-out 1`,
    '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
  },
]);
export const noteB = style([
  note,
  {
    right: '4%',
    bottom: '19%',
    background: '#f7a18d',
    color: '#45231c',
    transform: 'rotate(5deg)',
  },
]);
export const sceneBottom = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1.3rem',
  fontSize: '0.6rem',
  color: tokens.color.muted,
});
