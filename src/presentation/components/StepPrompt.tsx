import * as styles from './StepPrompt.css.ts';

interface StepPromptProps {
  readonly delayMs: number;
  readonly ready: boolean;
}

export function StepPrompt({ delayMs, ready }: StepPromptProps) {
  return (
    <div className={styles.gate} data-ready={ready} aria-hidden={!ready}>
      <p className={styles.prompt} style={{ animationDelay: `${delayMs}ms` }}>
        Press Space
      </p>
    </div>
  );
}
