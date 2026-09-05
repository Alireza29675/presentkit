import type { ComponentType } from 'react';
import type {
  AdvancePolicy,
  Cursor,
  Direction,
  NavigationControls,
  SlideDefinition,
} from '../navigation/types.ts';

export interface SlideProps<Step extends string = string> {
  readonly stepId: Step;
  readonly stepIndex: number;
  readonly direction: Direction;
  readonly isFirstVisit: boolean;
  readonly previousCursor: Cursor | null;
  readonly navigation: Pick<
    NavigationControls,
    'next' | 'previous' | 'canGoNext' | 'canGoPrevious'
  >;
}

export interface RenderableSlide extends SlideDefinition {
  readonly component: ComponentType<SlideProps>;
}

/** Preserve literal IDs while checking each component's step contract. */
export function defineSlide<
  const Id extends string,
  const Steps extends readonly [string, ...string[]],
>(definition: {
  readonly id: Id;
  readonly steps: Steps;
  readonly advance?: AdvancePolicy;
  readonly stepAdvance?: Readonly<
    Partial<Record<NoInfer<Steps[number]>, AdvancePolicy>>
  >;
  readonly component: ComponentType<SlideProps<NoInfer<Steps[number]>>>;
}) {
  const { id, steps, component: Slide } = definition;
  const isStep = (stepId: string): stepId is Steps[number] =>
    steps.includes(stepId);

  function SlideWithValidatedStep(props: SlideProps) {
    if (!isStep(props.stepId))
      throw new Error(`Unknown step "${props.stepId}" in slide "${id}".`);
    return <Slide {...props} stepId={props.stepId} />;
  }

  return {
    ...definition,
    component: SlideWithValidatedStep,
  } satisfies RenderableSlide;
}
