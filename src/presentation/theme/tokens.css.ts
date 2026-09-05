import { createThemeContract } from '@vanilla-extract/css';

/** Semantic roles shared by every presentation theme. Values live in themes. */
export const tokens = createThemeContract({
  color: {
    canvas: null,
    surface: null,
    text: null,
    muted: null,
    accent: null,
    border: null,
  },
  font: { body: null, heading: null },
  fontSize: { body: null, heading: null, subheading: null, label: null },
  space: { slideInline: null, slideBlock: null, gap: null },
  radius: { panel: null },
  motion: { fast: null, normal: null, easing: null },
  layout: { controlsHeight: null },
});

export type PresentationTheme = {
  readonly [Group in keyof typeof tokens]: {
    readonly [Token in keyof (typeof tokens)[Group]]: string;
  };
};
