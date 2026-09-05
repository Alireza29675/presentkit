import { createPresentationController } from './createPresentationController.ts';
import { usePresentationController } from './usePresentation.ts';

const controller = createPresentationController([
  { id: 'opening', steps: ['start'] },
  { id: 'demo', steps: ['explore', 'done'], advance: 'api-only' },
]);

controller.controls.goTo({ slideId: 'demo', stepId: 'done' });
// @ts-expect-error External API preserves correlated slide/step pairs.
controller.controls.goTo({ slideId: 'opening', stepId: 'done' });
// @ts-expect-error External API rejects unknown slide IDs.
controller.controls.goTo({ slideId: 'missing', stepId: 'start' });

export function ControllerConsumerContract() {
  const presentation = usePresentationController(controller);
  presentation.goTo({ slideId: 'demo', stepId: 'explore' });
  // @ts-expect-error React subscription preserves the controller's destination types.
  presentation.goTo({ slideId: 'opening', stepId: 'explore' });
  return null;
}
