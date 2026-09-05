import type { Step } from './steps.ts';

export const introTiming = { delayMs: 500, durationMs: 2800 } as const;
const textBeatMs = 700;
const forkTextBeatMs = 1500;
export const forkStartMs = forkTextBeatMs * 2;
export const forkMotionMs = 1600;
export const forkShineDelayMs = 150;
const completedForkHoldMs = 2000;
export const renameStartMs =
  forkStartMs + forkMotionMs + forkShineDelayMs + completedForkHoldMs;

export const stepTiming = {
  intro: {
    captionDelaysMs: [],
    settledAfterMs: introTiming.delayMs + introTiming.durationMs,
  },
  boilerplate: {
    captionDelaysMs: [textBeatMs, textBeatMs * 2, textBeatMs * 3],
    settledAfterMs: textBeatMs * 3 + 400,
  },
  fork: {
    captionDelaysMs: [forkTextBeatMs, forkStartMs, renameStartMs],
    settledAfterMs: renameStartMs + 400,
  },
  agent: { captionDelaysMs: [0], settledAfterMs: 800 },
} as const satisfies Record<
  Step,
  {
    readonly captionDelaysMs: readonly number[];
    readonly settledAfterMs: number;
  }
>;
