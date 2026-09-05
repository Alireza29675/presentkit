import { useState } from 'react';
import * as tour from '../../../tour.css.ts';
import * as styles from '../concepts.css.ts';

interface OrbitPreviewProps {
  readonly expanded: boolean;
  readonly waitingForSignal: boolean;
}

export function OrbitPreview({
  expanded,
  waitingForSignal,
}: OrbitPreviewProps) {
  const [preview, setPreview] = useState(0);

  return (
    <div className={styles.diagram}>
      <div className={styles.diagramHeader}>
        <span>orbit / a living scene</span>
        <span className={tour.accent}>
          {waitingForSignal ? 'Waiting for your signal' : 'React component'}
        </span>
      </div>
      <div className={styles.canvas} data-preview={expanded ? preview : 0}>
        <div className={styles.ring} data-visible={expanded && preview > 0} />
        <div
          className={styles.outerRing}
          data-visible={expanded && preview > 1}
        />
        <div className={styles.star}>✳</div>
        <span
          className={styles.planet}
          data-visible={expanded && preview > 0}
        />
        <span
          className={styles.otherPlanet}
          data-visible={expanded && preview > 1}
        />
        <span className={styles.canvasLabel}>
          {['A spark.', 'An orbit.', 'A whole system.'][expanded ? preview : 0]}
        </span>
      </div>
      {expanded ? (
        <div className={styles.stepButtons} aria-label="Preview scene states">
          {['Spark', 'Orbit', 'System'].map((label, index) => (
            <button
              key={label}
              className={styles.stepButton}
              aria-pressed={preview === index}
              onClick={() => setPreview(index)}
            >
              <span>0{index + 1}</span>
              {label}
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.sceneNote}>One component. Any composition.</div>
      )}
      <div className={styles.pipeline}>
        <span>Input</span>
        <span>→</span>
        <span>Controller</span>
        <span>→</span>
        <span>Scene + URL</span>
      </div>
    </div>
  );
}
