import type { AdvancePolicy } from '../../../navigation/types.ts';
export const steps = ['scene', 'steps', 'signal'] as const;
export type Step = (typeof steps)[number];
export const stepAdvance = { signal: 'api-only' } satisfies Partial<
  Record<Step, AdvancePolicy>
>;
export const scenes = {
  scene: {
    title: 'A slide is a scene.',
    description:
      'A React component with its own layout, visuals and interactions. There is no fixed slide template to fight.',
    code: 'slides/orbit/OrbitSlide.tsx',
    label: '01 / The scene',
  },
  steps: {
    title: 'A step changes the scene.',
    description:
      'Reveal an idea. Move an object. Change the emphasis. The scene stays mounted while the story evolves.',
    code: "steps = ['spark', 'orbit', 'system']",
    label: '02 / The story beats',
  },
  signal: {
    title: 'Your story owns the controls.',
    description:
      'An interaction can decide when to advance. This step waits for your signal. Space and Next cannot skip it.',
    code: "stepAdvance: { signal: 'api-only' }",
    label: '03 / The interaction',
  },
} satisfies Record<
  Step,
  { title: string; description: string; code: string; label: string }
>;
