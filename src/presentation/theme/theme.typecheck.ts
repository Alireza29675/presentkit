import type { PresentationTheme } from './tokens.css.ts';
import { lightThemeValues } from './themeValues.ts';

const { motion, ...withoutMotion } = lightThemeValues;
// @ts-expect-error Every theme must define the full token contract.
export const incompleteTheme: PresentationTheme = withoutMotion;

export const misspelledToken: PresentationTheme = {
  ...lightThemeValues,
  motion: {
    ...motion,
    // @ts-expect-error Unknown token names must not silently create unused values.
    durationn: '200ms',
  },
};

export const invalidValue: PresentationTheme = {
  ...lightThemeValues,
  motion: {
    ...motion,
    // @ts-expect-error Token values include their CSS units, rather than bare numbers.
    fast: 150,
  },
};
