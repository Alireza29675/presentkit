import type { PresentationController } from '../navigation/createPresentationController.ts';
import type { CursorFor, SlideDefinition } from '../navigation/types.ts';

export interface PresentationUrlHost {
  readonly location: {
    readonly hash: string;
    readonly pathname: string;
    readonly search: string;
  };
  readonly history: {
    readonly state: unknown;
    replaceState(data: unknown, unused: string, url: string): void;
  };
  addEventListener(type: 'hashchange' | 'popstate', listener: () => void): void;
  removeEventListener(
    type: 'hashchange' | 'popstate',
    listener: () => void,
  ): void;
}

/** URL values are untrusted; resolve them to an actual slide/step in this deck. */
export function resolveHash<const Deck extends readonly SlideDefinition[]>(
  deck: Deck,
  hash: string,
): CursorFor<Deck> {
  const params = new URLSearchParams(
    hash.startsWith('#') ? hash.slice(1) : hash,
  );
  const requestedSlide = deck.find((slide) => slide.id === params.get('slide'));
  const slide = requestedSlide ?? deck[0];
  const requestedStep = params.get('step');
  const stepId =
    requestedSlide &&
    requestedStep !== null &&
    requestedSlide.steps.includes(requestedStep)
      ? requestedStep
      : slide?.steps[0];
  if (!slide || stepId === undefined)
    throw new Error('URL restoration requires a nonempty deck and steps.');
  // Both IDs were resolved together from this deck, preserving their correlation.
  return { slideId: slide.id, stepId } as CursorFor<Deck>;
}

/** Owns only the presentation hash. Call the returned cleanup on disposal. */
export function connectPresentationUrl<
  const Deck extends readonly SlideDefinition[],
>(
  controller: PresentationController<CursorFor<NoInfer<Deck>>>,
  deck: Deck,
  host: PresentationUrlHost,
) {
  function writePosition() {
    const { slideId, stepId } = controller.getSnapshot().current;
    const hash = `#${new URLSearchParams({ slide: slideId, step: stepId })}`;
    if (host.location.hash === hash) return;
    host.history.replaceState(
      host.history.state,
      '',
      `${host.location.pathname}${host.location.search}${hash}`,
    );
  }

  function readPosition() {
    controller.controls.goTo(resolveHash(deck, host.location.hash));
    // A fallback or unchanged position still needs a canonical URL.
    writePosition();
  }

  readPosition();
  const unsubscribe = controller.subscribe(writePosition);
  host.addEventListener('hashchange', readPosition);
  host.addEventListener('popstate', readPosition);

  return () => {
    unsubscribe();
    host.removeEventListener('hashchange', readPosition);
    host.removeEventListener('popstate', readPosition);
  };
}
