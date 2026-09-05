import { defineSlide } from '../../stage/defineSlide.tsx';
import type { SlideProps } from '../../stage/defineSlide.tsx';
import { usePresentationApi } from '../../navigation/PresentationApi.tsx';
import { steps, scenes, stepAdvance } from './steps/steps.ts';
import type { Step } from './steps/steps.ts';
import * as tour from '../../tour.css.ts';
import * as styles from './concepts.css.ts';
import { OrbitPreview } from './components/OrbitPreview.tsx';

function ConceptsSlide({ stepId }: SlideProps<Step>) {
  const { completeStep } = usePresentationApi();
  const scene = scenes[stepId];
  const expanded = stepId !== 'scene';
  return (
    <section className={tour.slide} aria-labelledby="concept-title">
      <div className={tour.split}>
        <div>
          <p className={tour.eyebrow}>Under the surface / {scene.label}</p>
          <h1 className={tour.heading} id="concept-title">
            {scene.title}
          </h1>
          <p className={tour.body}>{scene.description}</p>
          <code className={styles.code}>{scene.code}</code>
          {stepId === 'signal' ? (
            <button className={tour.button} onClick={completeStep}>
              Send completion signal ↗
            </button>
          ) : (
            <button className={tour.secondaryButton} onClick={completeStep}>
              {stepId === 'scene'
                ? 'Look inside the scene →'
                : 'Who controls the next step? →'}
            </button>
          )}
        </div>
        <OrbitPreview
          expanded={expanded}
          waitingForSignal={stepId === 'signal'}
        />
      </div>
    </section>
  );
}
export const conceptsSlide = defineSlide({
  id: 'concepts',
  steps,
  stepAdvance,
  component: ConceptsSlide,
});
