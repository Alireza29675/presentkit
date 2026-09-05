import { deck } from './deck.ts';
import { Stage } from './stage/Stage.tsx';
import { usePresentationController } from './navigation/usePresentation.ts';
import { usePresentationKeyboard } from './keyboard/usePresentationKeyboard.ts';
import { PresentationApiProvider } from './navigation/PresentationApi.tsx';
import { presentationController } from './controller.ts';
import * as styles from './tour.css.ts';
import { PresentationProgress } from './components/PresentationProgress.tsx';

const totalSteps = deck.reduce((total, slide) => total + slide.steps.length, 0);

export function Presentation() {
  const presentation = usePresentationController(presentationController);
  usePresentationKeyboard(presentation);
  const completedSteps = deck
    .slice(0, presentation.slideIndex)
    .reduce((total, slide) => total + slide.steps.length, 0);
  return (
    <PresentationApiProvider controller={presentationController}>
      <div className={styles.root}>
        <header className={styles.header}>
          <span className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              ✳
            </span>
            PresentKit
          </span>
          <a
            className={styles.sourceLink}
            href="https://github.com/Alireza29675/presentkit"
            target="_blank"
            rel="noreferrer"
          >
            Source code ↗
          </a>
        </header>
        <Stage deck={deck} presentation={presentation} />
        <PresentationProgress
          value={completedSteps + presentation.stepIndex + 1}
          total={totalSteps}
        />
      </div>
    </PresentationApiProvider>
  );
}
