export const steps = ['intro', 'boilerplate', 'fork', 'agent'] as const;
export type Step = (typeof steps)[number];

interface Scene {
  readonly caption: readonly string[];
  readonly showDiagram: boolean;
  readonly showSource: boolean;
  readonly showAgent: boolean;
  readonly showFork: boolean;
  readonly repositoryName: string;
}

export const scenes = {
  intro: {
    caption: [],
    showDiagram: false,
    showSource: false,
    showAgent: false,
    showFork: false,
    repositoryName: 'PresentKit',
  },
  boilerplate: {
    caption: [
      'PresentKit is a boilerplate',
      'agents can use',
      'to build polished presentations.',
    ],
    showDiagram: true,
    showSource: true,
    showAgent: false,
    showFork: false,
    repositoryName: 'PresentKit',
  },
  fork: {
    caption: [
      'To do that,',
      'fork PresentKit,',
      'and name it after your talk.',
    ],
    showDiagram: true,
    showSource: true,
    showAgent: false,
    showFork: true,
    repositoryName: 'Ideas in Motion',
  },
  agent: {
    caption: [
      'Then open your agent on that repo and make things slide by slide.',
    ],
    showDiagram: true,
    showSource: false,
    showAgent: true,
    showFork: true,
    repositoryName: 'Ideas in Motion',
  },
} as const satisfies Record<Step, Scene>;
