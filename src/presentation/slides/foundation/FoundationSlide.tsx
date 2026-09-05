import { defineSlide } from '../../stage/defineSlide.tsx';
import { steps } from './steps/steps.ts';
import * as tour from '../../tour.css.ts';
import * as styles from './foundation.css.ts';

function FoundationSlide() {
  return (
    <section className={tour.slide} aria-labelledby="foundation-title">
      <h1 className={styles.statement} id="foundation-title">
        PresentKit gives the proper{' '}
        <span className={styles.accent}>
          state management, instructions and foundations
        </span>{' '}
        to make any type of presentation you want fast.
      </h1>
    </section>
  );
}
export const foundationSlide = defineSlide({
  id: 'foundation',
  steps,
  component: FoundationSlide,
});
