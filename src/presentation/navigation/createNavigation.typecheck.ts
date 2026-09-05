import { createNavigation } from './createNavigation.ts';

// Compiled by the type checker; intentionally excluded from runtime tests.
const navigation = createNavigation([
  { id: 'opening', steps: ['start', 'reveal'] },
  { id: 'closing', steps: ['start', 'complete'] },
]);

navigation.reducer(navigation.initialState, { type: 'next' });
navigation.reducer(navigation.initialState, { type: 'previous' });
navigation.reducer(navigation.initialState, {
  type: 'goTo', slideId: 'opening', stepId: 'reveal',
});
navigation.reducer(navigation.initialState, {
  type: 'goTo', slideId: 'closing', stepId: 'complete',
});

// @ts-expect-error A slide must belong to this presentation.
navigation.reducer(navigation.initialState, { type: 'goTo', slideId: 'missing', stepId: 'start' });
// @ts-expect-error A step must belong to this presentation.
navigation.reducer(navigation.initialState, { type: 'goTo', slideId: 'opening', stepId: 'missing' });
// @ts-expect-error Existing steps cannot be paired with the wrong slide.
navigation.reducer(navigation.initialState, { type: 'goTo', slideId: 'closing', stepId: 'reveal' });
// @ts-expect-error A destination must include a step.
navigation.reducer(navigation.initialState, { type: 'goTo', slideId: 'opening' });
// @ts-expect-error Only the supported navigation actions are accepted.
navigation.reducer(navigation.initialState, { type: 'reset' });
// @ts-expect-error State cursors preserve the same slide-to-step relationship.
navigation.reducer({ current: { slideId: 'opening', stepId: 'complete' }, previous: null }, { type: 'next' });
