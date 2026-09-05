import * as styles from './PresentationProgress.css.ts';

interface PresentationProgressProps {
  readonly value: number;
  readonly total: number;
}

export function PresentationProgress({ value, total }: PresentationProgressProps) {
  return (
    <footer className={styles.footer}>
      <div
        className={styles.track}
        role="progressbar"
        aria-label="Presentation progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={value}
      >
        <div className={styles.fill} style={{ width: `${(value / total) * 100}%` }} />
      </div>
      <p className={styles.hint}>Use arrow keys or space to navigate.</p>
    </footer>
  );
}
