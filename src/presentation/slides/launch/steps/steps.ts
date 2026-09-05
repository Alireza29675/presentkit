import type { AdvancePolicy } from '../../../navigation/types.ts';

export const steps = ['clone', 'agent', 'brief', 'preview'] as const;
export type Step = (typeof steps)[number];

export const stepAdvance = {
  clone: 'api-only',
  agent: 'api-only',
  brief: 'api-only',
} satisfies Partial<Record<Step, AdvancePolicy>>;

export const scenes = {
  clone: {
    title: 'Start with a clone.',
    description: 'One repository. Your next great presentation.',
    action: '01 / Get the foundation',
  },
  agent: {
    title: 'Bring your agent.',
    description:
      'Open the folder in your favorite coding agent. The authoring guide is already there.',
    action: '02 / Choose a workspace',
  },
  brief: {
    title: 'Give it a direction.',
    description:
      'A subject, a mood, a little ambition. Pick a brief to see the idea take shape.',
    action: '03 / Set the scene',
  },
  preview: {
    title: 'Make it your own.',
    description:
      'Your agent builds real React scenes. You shape the story, one step at a time.',
    action: '04 / From brief to stage',
  },
} satisfies Record<
  Step,
  { title: string; description: string; action: string }
>;

export const briefs = {
  space: {
    label: 'Space mission',
    title: 'Beyond the horizon.',
    subtitle: 'A mission worth sharing.',
    prompt:
      'Build a cinematic space mission presentation. Use orbital diagrams, bold type, and a click-to-launch interaction.',
    tag: 'MISSION / 01',
    statistic: '384,400',
    unit: 'kilometers of possibility',
  },
  product: {
    label: 'Product launch',
    title: 'Meet what’s next.',
    subtitle: 'Small details. A big leap.',
    prompt:
      'Build a confident product launch presentation. Use a bold hero, an interactive feature reveal, and a memorable closing.',
    tag: 'INTRODUCING / 01',
    statistic: '10×',
    unit: 'more room for your ideas',
  },
  workshop: {
    label: 'Design workshop',
    title: 'Think in possibilities.',
    subtitle: 'Make room for the unexpected.',
    prompt:
      'Build a playful design workshop presentation. Use colorful idea cards, a clickable exercise, and clear takeaways.',
    tag: 'WORKSHOP / 01',
    statistic: 'What if?',
    unit: 'start with a better question',
  },
} as const;

export type Brief = keyof typeof briefs;
