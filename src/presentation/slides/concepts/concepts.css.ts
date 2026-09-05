import { style } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';
export const code = style({
  display: 'block',
  fontSize: '0.8rem',
  lineHeight: 1.6,
  padding: '1rem',
  margin: '1.5rem 0',
  background: tokens.color.surface,
  borderRadius: '8px',
  borderLeft: `2px solid ${tokens.color.accent}`,
  overflowWrap: 'anywhere',
});
export const diagram = style({
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '16px',
  overflow: 'hidden',
  background: '#101722',
});
export const diagramHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '1.2rem',
  fontSize: '0.65rem',
  color: tokens.color.muted,
  borderBottom: `1px solid ${tokens.color.border}`,
});
export const canvas = style({
  height: '260px',
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
});
export const star = style({
  fontSize: '5rem',
  color: tokens.color.accent,
  zIndex: 1,
});
const orbit = style({
  position: 'absolute',
  border: '1px solid #68795288',
  borderRadius: '50%',
  transition: 'opacity 350ms ease, scale 350ms ease',
  selectors: { '&[data-visible="false"]': { opacity: 0, scale: '0.5' } },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
export const ring = style([orbit, { width: '160px', height: '160px' }]);
export const outerRing = style([orbit, { width: '240px', height: '240px' }]);
const dot = style({
  position: 'absolute',
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  transition: 'opacity 350ms ease, transform 350ms ease',
  selectors: {
    '&[data-visible="false"]': { opacity: 0, transform: 'scale(0)' },
  },
  '@media': { '(prefers-reduced-motion: reduce)': { transition: 'none' } },
});
export const planet = style([
  dot,
  { left: 'calc(50% + 70px)', top: 'calc(50% - 37px)', background: '#f7a18d' },
]);
export const otherPlanet = style([
  dot,
  { left: 'calc(50% - 113px)', top: 'calc(50% + 40px)', background: '#a6b9ed' },
]);
export const canvasLabel = style({
  position: 'absolute',
  bottom: '10px',
  color: tokens.color.muted,
  fontSize: '0.7rem',
});
export const stepButtons = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.5rem',
  padding: '1rem',
});
export const stepButton = style({
  padding: '0.8rem',
  border: `1px solid ${tokens.color.border}`,
  borderRadius: '7px',
  background: 'transparent',
  color: tokens.color.muted,
  cursor: 'pointer',
  display: 'flex',
  gap: '0.7rem',
  fontSize: '0.75rem',
  selectors: {
    '&[aria-pressed="true"]': {
      background: '#d1f67a15',
      borderColor: tokens.color.accent,
      color: tokens.color.accent,
    },
  },
});
export const sceneNote = style({
  padding: '1.65rem',
  textAlign: 'center',
  fontSize: '0.75rem',
  color: tokens.color.muted,
});
export const pipeline = style({
  display: 'flex',
  justifyContent: 'space-around',
  gap: '0.5rem',
  padding: '1rem',
  borderTop: `1px solid ${tokens.color.border}`,
  fontSize: '0.65rem',
  color: tokens.color.muted,
});
