import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from '../../../theme/tokens.css.ts';
import { forkMotionMs, forkShineDelayMs } from '../steps/timing.ts';

const rename = keyframes({
  from: { opacity: 0, transform: 'translateY(5px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});
const shine = keyframes({
  from: { transform: 'translateX(-160%) rotate(25deg)' },
  to: { transform: 'translateX(260%) rotate(25deg)' },
});
const movement = '800ms cubic-bezier(0.22, 1, 0.36, 1)';
export const journey = style({
  position: 'relative',
  width: 'min(100%, 760px)',
  height: '280px',
  margin: '0 auto',
});
const card = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: 'clamp(125px, 22vw, 220px)',
  height: '132px',
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
  background: tokens.color.surface,
  transition: `transform ${movement}, opacity 400ms ease`,
  selectors: {
    [`${journey}[data-step="fork"][data-animate="true"] &`]: {
      transitionDuration: `${forkMotionMs}ms, 400ms`,
    },
  },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
export const source = style([
  card,
  {
    color: tokens.color.muted,
    opacity: 0,
    transform: 'translate(calc(-100% - 40px), -50%)',
    selectors: {
      '&[data-visible="true"]': { opacity: 1 },
      [`${journey}[data-step="boilerplate"] &`]: {
        transform: 'translate(-50%, -50%)',
      },
    },
    '@media': {
      '(max-width: 500px)': {
        transform: 'translate(calc(-100% - 24px), -50%)',
      },
    },
  },
]);
export const fork = style([
  card,
  {
    overflow: 'hidden',
    color: tokens.color.accent,
    borderColor: '#9cc354',
    background: 'linear-gradient(145deg, #2f3b23, #17221b)',
    boxShadow: '0 0 45px #b2e96918, inset 0 1px 0 #e2ffab40',
    opacity: 0,
    transform: 'translate(calc(-100% - 40px), -50%) scale(0.94)',
    selectors: {
      '&[data-visible="true"]': {
        opacity: 1,
        transform: 'translate(40px, -50%)',
      },
      [`${journey}[data-step="agent"] &`]: {
        transform: 'translate(-50%, -50%)',
      },
      '&::after': {
        content: '',
        position: 'absolute',
        inset: '-40% 0',
        width: '50%',
        background:
          'linear-gradient(90deg, transparent, #e6ffba30, transparent)',
        opacity: 0,
        pointerEvents: 'none',
      },
      [`${journey}[data-step="fork"][data-animate="true"] &::after`]: {
        opacity: 1,
        animation: `${shine} ${forkMotionMs}ms ${forkShineDelayMs}ms ease-out both`,
      },
    },
    '@media': {
      '(max-width: 500px)': {
        transform: 'translate(calc(-100% - 24px), -50%) scale(0.94)',
        selectors: {
          '&[data-visible="true"]': { transform: 'translate(24px, -50%)' },
          [`${journey}[data-step="agent"] &`]: {
            transform: 'translate(-50%, -50%)',
          },
        },
      },
      '(prefers-reduced-motion: reduce)': {
        selectors: { '&::after': { animation: 'none', display: 'none' } },
      },
    },
  },
]);
export const connector = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '64px',
  height: '40px',
  transform: 'translate(-50%, -50%)',
  color: tokens.color.muted,
  opacity: 0,
  transition: 'opacity 400ms ease',
  selectors: {
    '&[data-visible="true"]': { opacity: 1 },
  },
  '@media': {
    '(max-width: 500px)': { width: '36px' },
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});
export const agentFrame = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: 'clamp(225px, 35vw, 350px)',
  height: '220px',
  transform: 'translate(-50%, -50%) scale(0.94)',
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '24px',
  background: '#ffffff02',
  opacity: 0,
  transition: `opacity 500ms ease 250ms, transform ${movement}`,
  selectors: {
    '&[data-visible="true"]': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
export const agentBadge = style({
  position: 'absolute',
  top: '-22px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '44px',
  height: '44px',
  display: 'grid',
  placeItems: 'center',
  background: tokens.color.canvas,
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '14px',
  color: tokens.color.text,
});
export const repositoryName = style({
  selectors: {
    [`${journey}[data-animate="true"] &`]: {
      animation: `${rename} 350ms ease both`,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      selectors: {
        [`${journey}[data-animate="true"] &`]: { animation: 'none' },
      },
    },
  },
});
