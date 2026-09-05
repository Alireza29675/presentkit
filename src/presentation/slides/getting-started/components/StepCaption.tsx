import * as styles from './stepCaption.css.ts';

interface StepCaptionProps {
  readonly chunks: readonly string[];
  readonly animate: boolean;
  readonly delaysMs: readonly number[];
}

export function StepCaption({ chunks, animate, delaysMs }: StepCaptionProps) {
  return (
    <p className={styles.caption}>
      {chunks.map((chunk, index) => (
        <span
          key={chunk}
          className={styles.chunk}
          data-animate={animate}
          style={{ animationDelay: `${delaysMs[index] ?? 0}ms` }}
        >
          {chunk}
          {index < chunks.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </p>
  );
}
