export const steps = ['bookmark', 'restored'] as const;
export type Step = (typeof steps)[number];
