# Presentation themes

Styles are authored in vanilla-extract `.css.ts` files and extracted by Vite. Import named classes into components; keep styles beside the slide or feature they describe.

## Files

- `tokens.css.ts`: semantic token names and the `PresentationTheme` value type.
- `themeValues.ts`: complete light and dark theme values, checked against the contract.
- `themes.css.ts`: generated theme classes and the root surface style.
- `global.css.ts`: minimal document reset and keyboard focus treatment.

The browser entry point applies `defaultTheme` and `themeRoot`. To change the whole presentation, use another theme class there. The engine only reads token roles; it does not select a talk's colors or typography.

## Create a theme

In a `.css.ts` file:

```ts
import { createTheme } from '@vanilla-extract/css';
import { tokens } from './tokens.css.ts';
import { lightThemeValues } from './themeValues.ts';

export const customTheme = createTheme(tokens, {
  ...lightThemeValues,
  color: { ...lightThemeValues.color, accent: '#3156d3' },
});
```

Every theme must supply all tokens, directly or by inheriting another complete value object. TypeScript checks names, completeness and string values; it does not validate every CSS value's meaning or color contrast. Keep units in values such as `150ms` and `1rem`.

## Consume tokens

```ts
import { style } from '@vanilla-extract/css';
import { tokens } from './tokens.css.ts';

export const heading = style({
  color: tokens.color.text,
  fontFamily: tokens.font.heading,
  fontSize: tokens.fontSize.heading,
});
```

Paths here are relative to this theme folder; adjust imports from slide folders. Use semantic tokens for shared decisions and literal values for genuinely local geometry. Do not turn every one-off value into a global token.

## Scoped overrides and dynamic values

A slide or panel can override a token on its container; descendants inherit it without affecting siblings:

```ts
export const accentPanel = style({
  vars: { [tokens.color.accent]: '#7950b3' },
  border: `1px solid ${tokens.color.accent}`,
});
```

Use `styleVariants` or explicit style maps for finite step states. For continuously changing geometry, use a typed React inline style; introduce `assignInlineVars` from vanilla-extract's dynamic package only when runtime token assignment is actually needed. Do not create styles inside render functions.

Motion uses `tokens.motion.fast`, `normal`, and `easing`; animated styles must include a `prefers-reduced-motion: reduce` rule. Layouts with navigation chrome can scope `tokens.layout.controlsHeight` to reserve its height; the default is zero, so the standalone Stage fills the viewport.

## Checks

`npm run build` checks source, the Vite config and compile-only theme contracts before extracting CSS. `npm test` verifies navigation. Visually check each theme, scoped overrides, keyboard focus, motion preferences and relevant viewports when changing styles.
