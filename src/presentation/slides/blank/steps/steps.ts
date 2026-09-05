export const steps = ['start'] as const;
export type Step = (typeof steps)[number];
