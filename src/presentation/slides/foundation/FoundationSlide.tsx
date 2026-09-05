import { defineSlide, type SlideProps } from '../../stage/defineSlide.tsx';
import { ForkButton } from './components/ForkButton.tsx';
import { steps } from './steps/steps.ts';
import * as tour from '../../tour.css.ts';
import * as styles from './foundation.css.ts';

function FoundationSlide({ isFirstVisit, direction }: SlideProps) {
  return (
    <section
      className={`${tour.slide} ${styles.layout}`}
      data-animate={isFirstVisit && direction !== 'backward'}
      aria-labelledby="foundation-title"
    >
      <h1 className={styles.statement} id="foundation-title">
        PresentKit gives the foundation.
      </h1>
      <ForkButton />
    </section>
  );
}
export const foundationSlide = defineSlide({
  id: 'foundation',
  steps,
  component: FoundationSlide,
});
