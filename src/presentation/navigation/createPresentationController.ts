import { createNavigation } from './createNavigation.ts';
import type {
  Cursor,
  CursorFor,
  NavigationAction,
  NavigationControls,
  NavigationPosition,
  NavigationState,
  SlideDefinition,
} from './types.ts';

/** One synchronous controller per mounted presentation; no process-wide singleton. */
export function createPresentationController<
  const Deck extends readonly SlideDefinition[],
>(
  deck: Deck,
  options: { readonly initialCursor?: CursorFor<NoInfer<Deck>> } = {},
): PresentationController<CursorFor<Deck>> {
  const navigation = createNavigation(deck);
  const initialCursor =
    options.initialCursor ?? navigation.initialState.current;
  if (!navigation.getPosition(initialCursor))
    throw new Error('Invalid initial presentation cursor.');
  let state: NavigationState<CursorFor<Deck>> = {
    current: { ...initialCursor },
    previous: null,
  };
  const listeners = new Set<() => void>();

  function dispatch(action: NavigationAction<CursorFor<Deck>>) {
    const nextState = navigation.reducer(state, action);
    if (nextState === state) return;
    state = nextState;
    for (const listener of [...listeners]) listener();
  }

  const previous = () => dispatch({ type: 'previous' });

  return {
    getSnapshot: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getPosition: navigation.getPosition,
    canAdvanceFromControls: navigation.canAdvanceFromControls,
    controls: {
      next: () => dispatch({ type: 'next', source: 'api' }),
      previous,
      goTo: (destination: CursorFor<Deck>) =>
        dispatch({ ...destination, type: 'goTo' }),
    },
    presenter: {
      next: () => dispatch({ type: 'next', source: 'controls' }),
      previous,
    },
    /** Capture before starting work. This completion applies only to this visit. */
    captureStepCompletion() {
      const expectedState = state;
      return () => dispatch({ type: 'completeStep', expectedState });
    },
  };
}

export interface PresentationController<Destination extends Cursor> {
  readonly getSnapshot: () => NavigationState<Destination>;
  readonly subscribe: (listener: () => void) => () => void;
  readonly getPosition: (cursor: Cursor | null) => NavigationPosition | null;
  readonly canAdvanceFromControls: (cursor: Cursor) => boolean;
  readonly controls: Pick<
    NavigationControls<Destination>,
    'next' | 'previous' | 'goTo'
  >;
  readonly presenter: Pick<NavigationControls, 'next' | 'previous'>;
  readonly captureStepCompletion: () => () => void;
}
