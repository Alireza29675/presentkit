export type AdvancePolicy = 'controls-and-api' | 'api-only';

export interface SlideDefinition {
  readonly id: string;
  readonly steps: readonly string[];
  readonly advance?: AdvancePolicy;
  readonly stepAdvance?: Readonly<Partial<Record<string, AdvancePolicy>>>;
}

export interface Cursor {
  readonly slideId: string;
  readonly stepId: string;
}

type SlideCursor<Slide extends SlideDefinition> = Slide extends SlideDefinition
  ? { readonly slideId: Slide['id']; readonly stepId: Slide['steps'][number] }
  : never;

/** Each slide ID is paired only with that slide's own step IDs. */
export type CursorFor<Deck extends readonly SlideDefinition[]> = SlideCursor<
  Deck[number]
>;

export type NavigationAction<Destination extends Cursor> =
  | { readonly type: 'next'; readonly source?: 'controls' | 'api' }
  | {
      readonly type: 'completeStep';
      readonly expectedState: NavigationState<Destination>;
    }
  | { readonly type: 'previous' }
  | ({ readonly type: 'goTo' } & Destination);

export interface NavigationState<Destination extends Cursor> {
  readonly current: Destination;
  readonly previous: Destination | null;
}

export interface NavigationPosition extends Cursor {
  readonly slideIndex: number;
  readonly stepIndex: number;
  readonly index: number;
  readonly canGoPrevious: boolean;
  readonly canGoNext: boolean;
}

export type Direction = 'none' | 'forward' | 'backward';

export interface NavigationControls<Destination extends Cursor = Cursor> {
  readonly next: () => void;
  readonly previous: () => void;
  readonly goTo: (destination: Destination) => void;
  readonly canGoNext: boolean;
  readonly canGoPrevious: boolean;
}

export interface Presentation<
  Destination extends Cursor,
> extends NavigationControls<Destination> {
  readonly current: Destination;
  readonly previousCursor: Destination | null;
  readonly slideIndex: number;
  readonly stepIndex: number;
  readonly direction: Direction;
}
