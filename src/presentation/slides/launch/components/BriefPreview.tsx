import { briefs } from '../steps/steps.ts';
import type { Brief } from '../steps/steps.ts';
import * as styles from '../launch.css.ts';

export function BriefPreview({ brief }: { readonly brief: Brief }) {
  const content = briefs[brief];
  return (
    <div className={`${styles.preview} ${styles.previewTheme[brief]}`}>
      <div className={styles.previewArt} aria-hidden="true">
        {brief === 'space' && (
          <>
            <div className={styles.orbit} />
            <div className={styles.planet} />
            <span className={styles.star}>✦</span>
          </>
        )}
        {brief === 'product' && (
          <>
            <div className={styles.productCard} />
            <div className={styles.productDot} />
          </>
        )}
        {brief === 'workshop' && (
          <>
            <span className={styles.ideaCard}>what if</span>
            <span className={styles.ideaCardSecond}>let’s try</span>
          </>
        )}
      </div>
      <div className={styles.previewContent}>
        <span className={styles.previewTag}>{content.tag}</span>
        <h2 className={styles.previewTitle}>{content.title}</h2>
        <p className={styles.previewSubtitle}>{content.subtitle}</p>
        <div className={styles.previewStatistic}>{content.statistic}</div>
        <span className={styles.previewTag}>{content.unit}</span>
      </div>
      <span className={styles.previewStamp}>Illustrative preview</span>
    </div>
  );
}
