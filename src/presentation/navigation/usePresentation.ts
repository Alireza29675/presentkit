import { useMemo, useSyncExternalStore } from 'react';
import { createPresentationController } from './createPresentationController.ts';
import type { PresentationController } from './createPresentationController.ts';
import type { Cursor, Presentation, SlideDefinition } from './types.ts';

export function usePresentationController<Destination extends Cursor>(
  controller: PresentationController<Destination>,
) {
  const state = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot,
  );
  const position = controller.getPosition(state.current);
  const origin = controller.getPosition(state.previous);
  if (!position)
    throw new Error('The active slide/step is missing from the deck.');

  const presentation: Presentation<Destination> = {
    current: state.current,
    previousCursor: state.previous,
    slideIndex: position.slideIndex,
    stepIndex: position.stepIndex,
    direction: !origin
      ? 'none'
      : position.index > origin.index
        ? 'forward'
        : 'backward',
    canGoNext: position.canGoNext,
    canGoPrevious: position.canGoPrevious,
    ...controller.controls,
  };

  return {
    ...presentation,
    controller,
    canAdvanceFromControls:
      position.canGoNext && controller.canAdvanceFromControls(state.current),
    presenter: controller.presenter,
  };
}

/** Convenience for a deck whose identity stays fixed while mounted. */
export function usePresentation<const Deck extends readonly SlideDefinition[]>(
  deck: Deck,
) {
  const controller = useMemo(() => createPresentationController(deck), [deck]);
  return usePresentationController(controller);
}
