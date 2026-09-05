import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../../theme/tokens.css.ts';

const enter = keyframes({
  from: { opacity: 0, transform: 'translateY(14px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});
const reducedMotion = {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      transition: 'none',
    },
  },
};

export const layout = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, .85fr) minmax(0, 1.35fr)',
  gap: 'clamp(24px, 5vw, 80px)',
  alignItems: 'center',
  '@media': { '(max-width: 900px)': { gridTemplateColumns: '1fr', gap: 24 } },
});
export const intro = style({ minWidth: 0 });
export const progress = style({
  listStyle: 'none',
  padding: 0,
  margin: '38px 0 28px',
  display: 'flex',
  gap: 18,
  flexWrap: 'wrap',
});
export const progressItem = style({
  display: 'grid',
  gap: 8,
  color: tokens.color.muted,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '.08em',
  selectors: { '&[aria-current="step"]': { color: tokens.color.accent } },
});
export const disclaimer = style({
  color: tokens.color.muted,
  fontSize: 12,
  lineHeight: 1.5,
});
export const workspace = style({
  minWidth: 0,
  width: '100%',
  border: `1px solid ${tokens.color.border}`,
  borderRadius: 20,
  overflow: 'hidden',
  background: '#111720',
  boxShadow: '0 30px 90px #0005',
});
export const chrome = style({
  display: 'flex',
  gap: 12,
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 22px',
  borderBottom: `1px solid ${tokens.color.border}`,
  color: tokens.color.muted,
  fontFamily: 'ui-monospace, monospace',
  fontSize: 11,
});
export const windowDots = style({
  letterSpacing: 3,
  color: '#687180',
  fontSize: 9,
});
export const status = style({ color: tokens.color.accent });
export const workspaceBody = style({
  padding: 'clamp(20px, 3vw, 40px)',
  minHeight: 385,
  animation: `${enter} 400ms ease both`,
  ...reducedMotion,
});
export const fileLabel = style({
  color: tokens.color.muted,
  fontSize: 11,
  fontFamily: 'ui-monospace, monospace',
  letterSpacing: '.13em',
  marginBottom: 24,
});
export const terminal = style({
  fontFamily: 'ui-monospace, monospace',
  fontSize: 'clamp(12px, 1.15vw, 16px)',
  lineHeight: 1.9,
  color: tokens.color.text,
  overflowWrap: 'anywhere',
});
export const shell = style({ color: tokens.color.accent, marginRight: 8 });
export const repository = style({ color: '#c5d0df' });
export const callout = style({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  color: tokens.color.muted,
  fontSize: 14,
  lineHeight: 1.7,
  margin: '28px 0',
});
export const check = style({
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: '#c7ee9416',
  color: tokens.color.accent,
});
export const choices = style({ display: 'grid', gap: 12 });
export const agentChoice = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  width: '100%',
  padding: '18px 20px',
  color: tokens.color.text,
  border: `1px solid ${tokens.color.border}`,
  borderRadius: 12,
  background: '#18202c',
  cursor: 'pointer',
  fontFamily: tokens.font.body,
  fontSize: 17,
  textAlign: 'left',
  transition: 'border-color 160ms, transform 160ms, background 160ms',
  selectors: {
    '&:hover': {
      borderColor: tokens.color.accent,
      background: '#212d30',
      transform: 'translateX(4px)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.color.accent}`,
      outlineOffset: 4,
    },
  },
  ...reducedMotion,
});
export const agentIcon = style({
  color: tokens.color.accent,
  fontSize: 25,
  width: 28,
  textAlign: 'center',
});
export const arrow = style({ marginLeft: 'auto', color: tokens.color.muted });
export const guide = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: 10,
  flexWrap: 'wrap',
  marginTop: 26,
  color: tokens.color.accent,
  fontFamily: 'ui-monospace, monospace',
  fontSize: 13,
});
export const guideNote = style({
  color: tokens.color.muted,
  fontFamily: tokens.font.body,
  fontSize: 12,
});
export const question = style({
  margin: '0 0 10px',
  fontSize: 'clamp(24px, 2.8vw, 36px)',
  letterSpacing: '-.04em',
});
export const hint = style({
  color: tokens.color.muted,
  margin: '0 0 24px',
  fontSize: 14,
});
export const prompt = style({
  color: tokens.color.text,
  lineHeight: 1.65,
  fontSize: 'clamp(13px, 1.3vw, 17px)',
  minHeight: '5em',
  margin: '0 0 18px',
  fontFamily: 'ui-monospace, monospace',
});
export const caret = style({ color: tokens.color.accent });
export const preview = style({
  position: 'relative',
  isolation: 'isolate',
  minHeight: 250,
  borderRadius: 12,
  overflow: 'hidden',
  padding: '28px 30px',
  color: '#f7f3e9',
  animation: `${enter} 750ms 120ms ease both`,
  ...reducedMotion,
});
export const previewTheme = styleVariants({
  space: { background: '#19233b' },
  product: { background: '#382a2d' },
  workshop: { background: '#243d35' },
});
export const previewContent = style({
  position: 'relative',
  zIndex: 1,
  width: '70%',
});
export const previewTag = style({
  fontSize: 9,
  letterSpacing: '.12em',
  textTransform: 'uppercase',
});
export const previewTitle = style({
  fontSize: 'clamp(25px, 3vw, 42px)',
  letterSpacing: '-.06em',
  lineHeight: 1.05,
  margin: '22px 0 10px',
  maxWidth: '9em',
});
export const previewSubtitle = style({ fontSize: 12, opacity: 0.75 });
export const previewStatistic = style({
  fontSize: 26,
  marginTop: 28,
  fontWeight: 700,
  letterSpacing: '-.04em',
});
export const previewStamp = style({
  position: 'absolute',
  bottom: 12,
  right: 14,
  fontSize: 9,
  opacity: 0.7,
});
export const previewArt = style({ position: 'absolute', inset: 0, zIndex: 0 });
export const orbit = style({
  position: 'absolute',
  width: 280,
  height: 160,
  border: '1px solid #cedcff50',
  borderRadius: '50%',
  transform: 'rotate(-40deg)',
  right: -70,
  top: 65,
});
export const planet = style({
  position: 'absolute',
  width: 150,
  height: 150,
  borderRadius: '50%',
  background:
    'radial-gradient(circle at 30% 30%, #f4d4af, #ab836e 45%, #4a4252 85%)',
  right: -12,
  top: 70,
  boxShadow: '0 0 60px #b39b8330',
});
export const star = style({
  position: 'absolute',
  right: '32%',
  top: 30,
  fontSize: 32,
  color: '#d4f4a3',
});
export const productCard = style({
  position: 'absolute',
  width: 130,
  height: 190,
  borderRadius: 30,
  border: '5px solid #f5d6c2',
  background: 'linear-gradient(145deg, #fbb28f, #96585b)',
  transform: 'rotate(18deg)',
  right: -12,
  top: 55,
  boxShadow: '-15px 20px 50px #0004',
});
export const productDot = style({
  position: 'absolute',
  width: 55,
  height: 55,
  background: '#d9f2a5',
  borderRadius: '50%',
  right: 80,
  top: 35,
});
export const ideaCard = style({
  position: 'absolute',
  display: 'grid',
  placeItems: 'center',
  width: 120,
  height: 130,
  background: '#efb097',
  color: '#24332a',
  transform: 'rotate(-14deg)',
  right: 8,
  top: 35,
  fontSize: 21,
  fontWeight: 700,
});
export const ideaCardSecond = style([
  ideaCard,
  { background: '#d7eaa1', transform: 'rotate(12deg)', right: -15, top: 135 },
]);
export const resultNote = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  flexWrap: 'wrap',
  color: tokens.color.muted,
  fontSize: 11,
  margin: '18px 0 0',
  lineHeight: 1.6,
});

export const screenReaderText = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
});
