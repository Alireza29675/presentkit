import { defineSlide } from './defineSlide.tsx';
import type { SlideProps } from './defineSlide.tsx';
import { usePresentation } from '../navigation/usePresentation.ts';

function OpeningSlide({ stepId }: SlideProps<'start' | 'reveal'>) {
  return <div>{stepId}</div>;
}

function ClosingSlide({ stepId }: SlideProps<'complete'>) {
  return <div>{stepId}</div>;
}

const opening = defineSlide({
  id: 'opening',
  steps: ['start', 'reveal'],
  component: OpeningSlide,
});
const closing = defineSlide({
  id: 'closing',
  steps: ['complete'],
  component: ClosingSlide,
});

defineSlide({
  id: 'incompatible',
  steps: ['start', 'reveal'],
  // @ts-expect-error The component must accept every declared step.
  component: ClosingSlide,
});

defineSlide({
  id: 'empty',
  // @ts-expect-error A slide must declare at least one step.
  steps: [],
  component: () => null,
});

// This compile-only component verifies the consumer-facing hook contract.
export function PresentationTypeContract() {
  const presentation = usePresentation([opening, closing]);
  presentation.goTo({ slideId: 'opening', stepId: 'reveal' });
  presentation.goTo({ slideId: 'closing', stepId: 'complete' });
  // @ts-expect-error A real step cannot be paired with the wrong slide.
  presentation.goTo({ slideId: 'closing', stepId: 'reveal' });
  // @ts-expect-error Destinations must name an existing slide.
  presentation.goTo({ slideId: 'missing', stepId: 'complete' });
  return null;
}

function StartOnlySlide({ stepId }: SlideProps<'start'>) {
  return <div>{stepId}</div>;
}

defineSlide({
  id: 'too-narrow',
  steps: ['start', 'reveal'],
  // @ts-expect-error A component accepting only start cannot render reveal.
  component: StartOnlySlide,
});

defineSlide({
  id: 'controlled',
  steps: ['start', 'reveal'],
  component: OpeningSlide,
  advance: 'api-only',
  stepAdvance: {
    reveal: 'controls-and-api',
    // @ts-expect-error Policy keys must name a declared step.
    missing: 'api-only',
  },
});

defineSlide({
  id: 'bad-policy',
  steps: ['start', 'reveal'],
  component: OpeningSlide,
  // @ts-expect-error Advance policy names are an explicit union.
  advance: 'anything',
});
