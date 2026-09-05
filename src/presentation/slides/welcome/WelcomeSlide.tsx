import { defineSlide } from '../../stage/defineSlide.tsx';
import { usePresentationApi } from '../../navigation/PresentationApi.tsx';
import { steps } from './steps/steps.ts';
import * as tour from '../../tour.css.ts';
import * as styles from './welcome.css.ts';

function WelcomeSlide() {
  const { completeStep } = usePresentationApi();
  return (
    <section className={tour.slide} aria-labelledby="welcome-title">
      <div className={tour.split}>
        <div>
          <p className={tour.eyebrow}>
            An open foundation for extraordinary presentations
          </p>
          <h1 id="welcome-title" className={tour.heading}>
            Don't just
            <br />
            show slides.
            <br />
            <span className={tour.accent}>Build a world.</span>
          </h1>
          <p className={tour.body}>
            Your ideas, a coding agent, and a stage that can become anything.
          </p>
          <button className={tour.button} onClick={completeStep}>
            Make something →
          </button>
          <p className={styles.meta}>Open source · MIT · Made to be remixed</p>
        </div>
        <div
          className={styles.scene}
          aria-label="An interactive presentation made of layered scenes"
        >
          <div className={styles.sceneTop}>
            <span className={styles.liveDot} /> A canvas with possibilities{' '}
            <span>01—∞</span>
          </div>
          <div className={styles.orbit} aria-hidden="true">
            <div className={styles.core}>✳</div>
          </div>
          <div className={styles.noteA}>
            <span>Ideas</span>
            <strong>
              Make the abstract
              <br />
              feel tangible.
            </strong>
          </div>
          <div className={styles.noteB}>
            <span>Interaction</span>
            <strong>
              Let curiosity
              <br />
              drive the story. ↗
            </strong>
          </div>
          <div className={styles.sceneBottom}>
            <span>Slides → steps → possibilities</span>
            <span className={tour.accent}>● Live by design</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export const welcomeSlide = defineSlide({
  id: 'welcome',
  steps,
  component: WelcomeSlide,
});
