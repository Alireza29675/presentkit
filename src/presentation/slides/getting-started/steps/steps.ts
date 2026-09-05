export const steps = [
  'intro',
  'boilerplate',
  'fork',
  'rename',
  'agent',
] as const;
export type Step = (typeof steps)[number];

interface Scene {
  readonly caption: string;
  readonly showDiagram: boolean;
  readonly showSource: boolean;
  readonly showAgent: boolean;
  readonly showFork: boolean;
  readonly repositoryName: string;
}

export const scenes = {
  intro: {
    caption: '',
    showDiagram: false,
    showSource: false,
    showAgent: false,
    showFork: false,
    repositoryName: 'PresentKit',
  },
  boilerplate: {
    caption: '',
    showDiagram: true,
    showSource: true,
    showAgent: false,
    showFork: false,
    repositoryName: 'PresentKit',
  },
  fork: {
    caption: 'You fork the PresentKit repo.',
    showDiagram: true,
    showSource: true,
    showAgent: false,
    showFork: true,
    repositoryName: 'PresentKit',
  },
  rename: {
    caption: 'Put another name on your repo.',
    showDiagram: true,
    showSource: true,
    showAgent: false,
    showFork: true,
    repositoryName: 'My Next Talk',
  },
  agent: {
    caption:
      'Then open your agent on that repo and make things slide by slide.',
    showDiagram: true,
    showSource: false,
    showAgent: true,
    showFork: true,
    repositoryName: 'My Next Talk',
  },
} as const satisfies Record<Step, Scene>;

export const boilerplateChunks = [
  'PresentKit is a boilerplate',
  'agents can use',
  'to build polished presentations.',
] as const;
