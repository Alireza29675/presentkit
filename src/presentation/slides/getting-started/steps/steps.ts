export const steps = ['intro', 'fork', 'rename', 'agent'] as const;
export type Step = (typeof steps)[number];

interface Scene {
  readonly caption: string;
  readonly showDiagram: boolean;
  readonly showSource: boolean;
  readonly showAgent: boolean;
  readonly repositoryName: string;
}

export const scenes = {
  intro: {
    caption: '',
    showDiagram: false,
    showSource: false,
    showAgent: false,
    repositoryName: 'PresentKit',
  },
  fork: {
    caption: 'You fork the PresentKit repo.',
    showDiagram: true,
    showSource: true,
    showAgent: false,
    repositoryName: 'PresentKit',
  },
  rename: {
    caption: 'Put another name on your repo.',
    showDiagram: true,
    showSource: true,
    showAgent: false,
    repositoryName: 'My Next Talk',
  },
  agent: {
    caption:
      'Then open your agent on that repo and make things slide by slide.',
    showDiagram: true,
    showSource: false,
    showAgent: true,
    repositoryName: 'My Next Talk',
  },
} as const satisfies Record<Step, Scene>;
