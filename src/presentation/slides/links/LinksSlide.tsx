import { defineSlide, type SlideProps } from '../../stage/defineSlide.tsx';
import { usePresentationApi } from '../../navigation/PresentationApi.tsx';
import { steps, type Step } from './steps/steps.ts';
import * as tour from '../../tour.css.ts';
import * as styles from './links.css.ts';

function LinksSlide({ stepId }: SlideProps<Step>) {
  const { completeStep } = usePresentationApi();
  const restored = stepId === 'restored';
  return (
    <section className={tour.slide} aria-labelledby="links-title">
      <div className={tour.split}>
        <div>
          <p className={tour.eyebrow}>A small detail. A big relief.</p>
          <h1 className={tour.heading} id="links-title">
            {restored
              ? 'Go ahead. Hit refresh.'
              : 'Every moment has an address.'}
          </h1>
          <p className={tour.body}>
            {restored
              ? 'You will come right back to this step. Copy the link, reopen it, or share this exact moment.'
              : 'Your slide and step live in the URL. No counting slides. No losing your place halfway through a story.'}
          </p>
          <button
            className={tour.button}
            onClick={restored ? () => window.location.reload() : completeStep}
          >
            {restored ? 'Refresh this page ↻' : 'Put a pin here →'}
          </button>
          <p className={styles.note}>
            Position is restored. Local interaction values are not.
          </p>
        </div>
        <div className={styles.address}>
          <div className={styles.browserBar}>
            <span aria-hidden="true">● ● ●</span>
            <span>Your presentation</span>
          </div>
          <div className={styles.url}>
            <span className={tour.muted}>#slide=</span>
            <strong>links</strong>
            <br />
            <span className={tour.muted}>&amp;step=</span>
            <strong className={tour.accent}>{stepId}</strong>
          </div>
          <div className={styles.legend}>
            <span>01 / Stable slide ID</span>
            <span>02 / Named step</span>
          </div>
          <div className={styles.bookmark} key={stepId}>
            <span aria-hidden="true">⌖</span>
            <p>
              {restored
                ? 'This moment is bookmarked.'
                : 'A readable link to your story.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export const linksSlide = defineSlide({
  id: 'links',
  steps,
  component: LinksSlide,
});
