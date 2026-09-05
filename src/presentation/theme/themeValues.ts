import type { PresentationTheme } from './tokens.css.ts';

export const lightThemeValues = {
  color: {
    canvas: '#f3f0e8',
    surface: '#faf8f2',
    text: '#242622',
    muted: '#64665e',
    accent: '#b64729',
    border: '#d6d6ca',
  },
  font: {
    body: "Inter, 'Helvetica Neue', Arial, sans-serif",
    heading: "Inter, 'Helvetica Neue', Arial, sans-serif",
  },
  fontSize: {
    body: '1rem',
    heading: 'clamp(3rem, 7.5vw, 8rem)',
    subheading: 'clamp(1.5rem, 3vw, 2.5rem)',
    label: '0.75rem',
  },
  space: {
    slideInline: 'clamp(1.5rem, 7vw, 7rem)',
    slideBlock: 'clamp(2rem, 5vw, 5rem)',
    gap: '1rem',
  },
  radius: { panel: '4px' },
  motion: { fast: '150ms', normal: '300ms', easing: 'ease' },
  layout: { controlsHeight: '0px' },
} satisfies PresentationTheme;

export const darkThemeValues = {
  ...lightThemeValues,
  color: {
    canvas: '#18201e',
    surface: '#202b29',
    text: '#f5f0e6',
    muted: '#bac9c1',
    accent: '#c8e9a3',
    border: '#789b8a',
  },
} satisfies PresentationTheme;
