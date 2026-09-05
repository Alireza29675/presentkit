import { stage } from './Stage.css.ts';
import type { RenderableSlide } from './defineSlide.tsx';
import type { CursorFor, Presentation } from '../navigation/types.ts';

interface StageProps<Deck extends readonly RenderableSlide[]> {
  readonly deck: Deck;
  readonly presentation: Presentation<CursorFor<NoInfer<Deck>>>;
}

export function Stage<const Deck extends readonly RenderableSlide[]>({ deck, presentation }: StageProps<Deck>) {
  const slide = deck[presentation.slideIndex];
  if (!slide) throw new Error('The active slide is missing from the deck.');
  const Slide = slide.component;

  return (
    <main className={stage} aria-label="Presentation">
      <Slide
        key={slide.id}
        stepId={presentation.current.stepId}
        stepIndex={presentation.stepIndex}
        direction={presentation.direction}
        previousCursor={presentation.previousCursor}
        navigation={{
          next: presentation.next,
          previous: presentation.previous,
          canGoNext: presentation.canGoNext,
          canGoPrevious: presentation.canGoPrevious,
        }}
      />
    </main>
  );
}
