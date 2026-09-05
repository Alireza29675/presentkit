import { defineSlide } from '../../stage/defineSlide.tsx';
import { steps } from './steps/steps.ts';
import * as tour from '../../tour.css.ts';
import * as styles from './finish.css.ts';

function FinishSlide() {
  return (
    <section
      className={`${tour.slide} ${styles.center}`}
      aria-labelledby="finish-title"
    >
      <p className={tour.eyebrow}>
        The foundation is ready. The story is yours.
      </p>
      <h1 className={tour.heading} id="finish-title">
        Your next talk starts
        <br />
        with <span className={tour.accent}>one sentence.</span>
      </h1>
      <p className={tour.body}>
        Clone it. Open your coding agent. Describe the audience, the idea, and
        how you want it to feel.
      </p>
      <a
        className={tour.button}
        href="https://github.com/Alireza29675/presentkit"
        target="_blank"
        rel="noreferrer"
      >
        Make it yours ↗
      </a>
      <p className={styles.signature}>
        React + TypeScript + Vite · Typed themes · MIT licensed
      </p>
    </section>
  );
}
export const finishSlide = defineSlide({
  id: 'finish',
  steps,
  component: FinishSlide,
});
