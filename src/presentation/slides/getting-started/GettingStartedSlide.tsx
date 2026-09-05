import { defineSlide, type SlideProps } from '../../stage/defineSlide.tsx';
import { RepositoryJourney } from './components/RepositoryJourney.tsx';
import { scenes, steps, type Step } from './steps/steps.ts';
import * as styles from './gettingStarted.css.ts';

function GettingStartedSlide({ stepId }: SlideProps<Step>) {
  const scene = scenes[stepId];
  return (
    <section
      className={styles.slide}
      aria-labelledby="getting-started-title"
      data-expanded={scene.showDiagram}
    >
      <h1 className={styles.title} id="getting-started-title">
        This is a presentation
        <br />
        built on top of <span className={styles.accent}>PresentKit</span>.
      </h1>
      <div className={styles.story} aria-hidden={!scene.showDiagram}>
        <p className={styles.caption} key={stepId}>
          {scene.caption}
        </p>
        <RepositoryJourney scene={scene} stepId={stepId} />
      </div>
    </section>
  );
}

export const gettingStartedSlide = defineSlide({
  id: 'getting-started',
  steps,
  component: GettingStartedSlide,
});
