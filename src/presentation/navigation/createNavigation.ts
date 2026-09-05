import type {
  AdvancePolicy,
  Cursor,
  CursorFor,
  NavigationAction,
  NavigationPosition,
  NavigationState,
  SlideDefinition,
} from './types.ts';

/** Build a navigation model once for a stable, ordered deck definition. */
export function createNavigation<const Deck extends readonly SlideDefinition[]>(
  deck: Deck,
) {
  type Destination = CursorFor<Deck>;
  type State = NavigationState<Destination>;

  if (!Array.isArray(deck) || deck.length === 0) {
    throw new Error('A presentation needs at least one slide.');
  }

  const positions: (Omit<
    NavigationPosition,
    'index' | 'canGoPrevious' | 'canGoNext'
  > & { advance: AdvancePolicy })[] = [];
  const slideIds = new Set<string>();
  const isId = (id: unknown): id is string =>
    typeof id === 'string' && id.trim().length > 0;

  for (const [slideIndex, slide] of deck.entries()) {
    if (!isId(slide?.id) || slideIds.has(slide.id)) {
      throw new Error('Slide IDs must be non-empty and unique.');
    }
    slideIds.add(slide.id);
    if (!Array.isArray(slide.steps) || slide.steps.length === 0) {
      throw new Error(`Slide "${slide.id}" needs at least one step.`);
    }
    const validPolicy = (policy: unknown): policy is AdvancePolicy =>
      policy === 'controls-and-api' || policy === 'api-only';
    if (slide.advance !== undefined && !validPolicy(slide.advance)) {
      throw new Error(`Invalid advance policy for slide "${slide.id}".`);
    }
    if (
      slide.stepAdvance !== undefined &&
      (slide.stepAdvance === null ||
        typeof slide.stepAdvance !== 'object' ||
        Array.isArray(slide.stepAdvance))
    )
      throw new Error(
        `Step advance policies for "${slide.id}" must be an object.`,
      );
    for (const [stepId, policy] of Object.entries(slide.stepAdvance ?? {})) {
      if (!slide.steps.includes(stepId) || !validPolicy(policy)) {
        throw new Error(
          `Invalid step advance policy for "${slide.id}/${stepId}".`,
        );
      }
    }
    const stepIds = new Set<string>();
    for (const [stepIndex, stepId] of slide.steps.entries()) {
      if (!isId(stepId) || stepIds.has(stepId)) {
        throw new Error(
          `Step IDs in slide "${slide.id}" must be non-empty and unique.`,
        );
      }
      stepIds.add(stepId);
      const override =
        slide.stepAdvance && Object.hasOwn(slide.stepAdvance, stepId)
          ? slide.stepAdvance[stepId]
          : undefined;
      positions.push({
        slideId: slide.id,
        stepId,
        slideIndex,
        stepIndex,
        advance: override ?? slide.advance ?? 'controls-and-api',
      });
    }
  }

  function indexOf(cursor: Cursor | null) {
    return positions.findIndex(
      (position) =>
        position.slideId === cursor?.slideId &&
        position.stepId === cursor?.stepId,
    );
  }

  function cursorAt(index: number): Destination {
    const position = positions[index];
    if (!position)
      throw new Error(`No presentation position at index ${index}.`);
    // Positions are built exclusively from this deck's validated slide/step pairs.
    return {
      slideId: position.slideId,
      stepId: position.stepId,
    } as Destination;
  }

  function getPosition(cursor: Cursor | null): NavigationPosition | null {
    const index = indexOf(cursor);
    const position = positions[index];
    if (!position) return null;
    const { advance: _advance, ...coordinates } = position;
    return {
      ...coordinates,
      index,
      canGoPrevious: index > 0,
      canGoNext: index < positions.length - 1,
    };
  }

  function reducer(state: State, action: NavigationAction<Destination>): State {
    const currentIndex = indexOf(state.current);
    let targetIndex: number;
    switch (action.type) {
      case 'next':
        if (
          action.source !== 'api' &&
          positions[currentIndex]?.advance === 'api-only'
        )
          return state;
        targetIndex = currentIndex + 1;
        break;
      case 'completeStep':
        if (action.expectedState !== state) return state;
        targetIndex = currentIndex + 1;
        break;
      case 'previous':
        targetIndex = currentIndex - 1;
        break;
      case 'goTo':
        targetIndex = indexOf(action);
        break;
      default:
        return state;
    }
    if (
      targetIndex < 0 ||
      targetIndex >= positions.length ||
      targetIndex === currentIndex
    ) {
      return state;
    }
    return { current: cursorAt(targetIndex), previous: state.current };
  }

  const initialState: State = { current: cursorAt(0), previous: null };
  const canAdvanceFromControls = (cursor: Cursor) =>
    positions[indexOf(cursor)]?.advance !== 'api-only';
  return { initialState, reducer, getPosition, canAdvanceFromControls };
}
