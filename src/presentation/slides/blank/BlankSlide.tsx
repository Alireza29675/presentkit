import { defineSlide } from '../../stage/defineSlide.tsx';
import type { SlideProps } from '../../stage/defineSlide.tsx';

import { steps } from './steps/steps.ts';
import type { Step } from './steps/steps.ts';

function BlankSlide(_props: SlideProps<Step>) {
  return null;
}

export const blankSlide = defineSlide({
  id: 'blank',
  steps,
  component: BlankSlide,
});
