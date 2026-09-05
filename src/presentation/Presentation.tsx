import { deck } from './deck.ts';
import { Stage } from './stage/Stage.tsx';
import { usePresentationController } from './navigation/usePresentation.ts';
import { usePresentationKeyboard } from './keyboard/usePresentationKeyboard.ts';
import { PresentationApiProvider } from './navigation/PresentationApi.tsx';
import { presentationController } from './controller.ts';
import * as styles from './tour.css.ts';

export function Presentation() {
  const presentation = usePresentationController(presentationController);
  usePresentationKeyboard(presentation);
  return (
    <PresentationApiProvider controller={presentationController}>
      <div className={styles.root}>
        <header className={styles.header}>
          <span className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              ✳
            </span>
            Presentation Foundation
          </span>
          <a
            className={styles.sourceLink}
            href="https://github.com/Alireza29675/presentation-foundation"
            target="_blank"
            rel="noreferrer"
          >
            Source code ↗
          </a>
        </header>
        <Stage deck={deck} presentation={presentation} />
        <footer className={styles.footer}>
          <span className={styles.progress}>
            SCENE {presentation.slideIndex + 1} / {deck.length} · STEP{' '}
            {presentation.stepIndex + 1}
          </span>
          <span className={styles.hint}>
            {!presentation.canGoNext
              ? 'Make it yours.'
              : presentation.canAdvanceFromControls
                ? '← → to navigate'
                : 'Interact with the scene to continue'}
          </span>
          <div className={styles.navButtons}>
            <button
              className={styles.navButton}
              onClick={presentation.presenter.previous}
              disabled={!presentation.canGoPrevious}
            >
              ← Back
            </button>
            <button
              className={styles.navButton}
              onClick={presentation.presenter.next}
              disabled={!presentation.canAdvanceFromControls}
            >
              Next →
            </button>
          </div>
        </footer>
      </div>
    </PresentationApiProvider>
  );
}
