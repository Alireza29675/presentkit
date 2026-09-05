import * as styles from './stepCaption.css.ts';

interface StepCaptionProps {
  readonly chunks: readonly string[];
  readonly animate: boolean;
  readonly beatMs: number;
}

export function StepCaption({ chunks, animate, beatMs }: StepCaptionProps) {
  return (
    <p className={styles.caption}>
      {chunks.map((chunk, index) => (
        <span
          key={chunk}
          className={styles.chunk}
          data-animate={animate}
          style={{ animationDelay: `${(index + 1) * beatMs}ms` }}
        >
          {chunk}
          {index < chunks.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </p>
  );
}
