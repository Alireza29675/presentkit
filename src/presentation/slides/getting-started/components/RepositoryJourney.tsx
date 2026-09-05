import { useEffect, useState } from 'react';
import { forkStartMs, renameStartMs } from '../steps/timing.ts';
import type { scenes, Step } from '../steps/steps.ts';
import * as styles from './repositoryJourney.css.ts';

interface RepositoryJourneyProps {
  readonly scene: (typeof scenes)[Step];
  readonly stepId: Step;
  readonly animate: boolean;
}

function RepositoryGlyph() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v18M12 8h4M12 12h4" />
    </svg>
  );
}

export function RepositoryJourney({
  scene,
  stepId,
  animate,
}: RepositoryJourneyProps) {
  const [forkPhase, setForkPhase] = useState<'waiting' | 'forked' | 'named'>(
    'waiting',
  );
  const stagingFork = stepId === 'fork' && animate;
  const waitingForFork = stagingFork && forkPhase === 'waiting';
  const repositoryName =
    stagingFork && forkPhase !== 'named' ? 'PresentKit' : scene.repositoryName;

  useEffect(() => {
    if (!stagingFork) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => setForkPhase('named');
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    if (preference.matches) {
      finish();
      return;
    }
    const forkTimer = window.setTimeout(
      () => setForkPhase((phase) => (phase === 'named' ? phase : 'forked')),
      forkStartMs,
    );
    const renameTimer = window.setTimeout(finish, renameStartMs);
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      window.clearTimeout(forkTimer);
      window.clearTimeout(renameTimer);
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [stagingFork]);

  return (
    <div
      className={styles.journey}
      data-step={waitingForFork ? 'boilerplate' : stepId}
      data-animate={animate}
    >
      <div
        className={styles.agentFrame}
        data-visible={scene.showAgent}
        aria-hidden={!scene.showAgent}
      >
        <div className={styles.agentBadge}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-label="Coding agent"
          >
            <path d="M12 3v3M9 3h6" />
            <rect x="4" y="6" width="16" height="14" rx="5" />
            <path d="m9 10-2 3 2 3m6-6 2 3-2 3" />
          </svg>
        </div>
      </div>
      <div
        className={styles.source}
        data-visible={scene.showSource}
        aria-hidden={!scene.showSource}
      >
        <RepositoryGlyph />
        <span>PresentKit</span>
      </div>
      <svg
        className={styles.connector}
        viewBox="0 0 120 40"
        data-visible={scene.showSource && scene.showFork && !waitingForFork}
        aria-hidden="true"
      >
        <path
          d="M0 20h112m-8-7 8 7-8 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div
        className={styles.fork}
        data-visible={scene.showFork && !waitingForFork}
        aria-hidden={!scene.showFork || waitingForFork}
      >
        <RepositoryGlyph />
        <span className={styles.repositoryName} key={repositoryName}>
          {repositoryName}
        </span>
      </div>
    </div>
  );
}
