import { useEffect, useState } from 'react';
import { defineSlide, type SlideProps } from '../../stage/defineSlide.tsx';
import { StepPrompt } from '../../components/StepPrompt.tsx';
import { StepCaption } from './components/StepCaption.tsx';
import { RepositoryJourney } from './components/RepositoryJourney.tsx';
import { scenes, steps, type Step } from './steps/steps.ts';
import { stepTiming } from './steps/timing.ts';
import * as styles from './gettingStarted.css.ts';

function GettingStartedSlide({
  stepId,
  isFirstVisit,
  direction,
  navigation,
}: SlideProps<Step>) {
  const scene = scenes[stepId];
  const animate = isFirstVisit && direction !== 'backward';
  // The title's entrance survives forward steps, but never replays on a return.
  const [titleEntering, setTitleEntering] = useState(
    stepId === 'intro' && animate,
  );
  useEffect(() => {
    if (!titleEntering) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      if (preference.matches) setTitleEntering(false);
    };
    if (direction === 'backward' || preference.matches) setTitleEntering(false);
    preference.addEventListener('change', settle);
    return () => preference.removeEventListener('change', settle);
  }, [direction, titleEntering]);
  const timing = stepTiming[stepId];
  return (
    <section
      className={styles.slide}
      aria-labelledby="getting-started-title"
      data-expanded={scene.showDiagram}
    >
      <h1 className={styles.title} id="getting-started-title">
        <span
          className={styles.titleEntrance}
          data-animate={titleEntering}
          onAnimationEnd={() => setTitleEntering(false)}
        >
          This is a presentation
          <br />
          built on top of <span className={styles.accent}>PresentKit</span>.
        </span>
      </h1>
      <div className={styles.story} aria-hidden={!scene.showDiagram}>
        <StepCaption
          key={stepId}
          chunks={scene.caption}
          animate={animate}
          delaysMs={timing.captionDelaysMs}
        />
        <RepositoryJourney scene={scene} stepId={stepId} animate={animate} />
      </div>
      {animate && navigation.canGoNext && (
        <StepPrompt
          key={stepId}
          delayMs={timing.settledAfterMs}
          ready={!titleEntering}
        />
      )}
    </section>
  );
}
export const gettingStartedSlide = defineSlide({
  id: 'getting-started',
  steps,
  component: GettingStartedSlide,
});
