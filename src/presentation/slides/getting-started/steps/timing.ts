import type { Step } from './steps.ts';

export const introTiming = { delayMs: 500, durationMs: 2800 } as const;
export const textBeatMs = 700;
export const forkStartMs = textBeatMs * 2;
export const renameStartMs = textBeatMs * 3;
export const forkMotionMs = 1600;

export const stepTiming = {
  intro: {
    textBeatMs: 0,
    settledAfterMs: introTiming.delayMs + introTiming.durationMs,
  },
  boilerplate: { textBeatMs, settledAfterMs: textBeatMs * 3 + 400 },
  fork: { textBeatMs, settledAfterMs: forkStartMs + 150 + forkMotionMs },
  agent: { textBeatMs: 0, settledAfterMs: 800 },
} as const satisfies Record<
  Step,
  { readonly textBeatMs: number; readonly settledAfterMs: number }
>;
