import assert from 'node:assert/strict';
import test from 'node:test';
import { createNavigation } from './createNavigation.ts';
import { createPresentationController } from './createPresentationController.ts';

const deck = [
  { id: 'opening', steps: ['start'] },
  {
    id: 'interaction',
    steps: ['intro', 'slider', 'finished'],
    stepAdvance: { slider: 'api-only' },
  },
  { id: 'closing', steps: ['start'] },
] as const;

const cursor = (slideId: string, stepId: string) => ({ slideId, stepId });

test('presenter advances normally, stops at an API-only step, and can still go back', () => {
  const controller = createPresentationController(deck);
  controller.presenter.next();
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('interaction', 'intro'),
  );
  controller.presenter.next();
  const blocked = controller.getSnapshot();
  assert.deepEqual(blocked.current, cursor('interaction', 'slider'));
  controller.presenter.next();
  controller.presenter.next();
  assert.equal(controller.getSnapshot(), blocked);
  controller.presenter.previous();
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('interaction', 'intro'),
  );
});

test('slide policy is inherited and individual steps can opt back into presenter controls', () => {
  const controller = createPresentationController([
    {
      id: 'interactive',
      steps: ['first', 'second', 'third'],
      advance: 'api-only',
      stepAdvance: { second: 'controls-and-api' },
    },
    { id: 'closing', steps: ['start'] },
  ] as const);
  const first = controller.getSnapshot();
  controller.presenter.next();
  assert.equal(controller.getSnapshot(), first);
  controller.controls.next();
  controller.presenter.next();
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('interactive', 'third'),
  );
  const third = controller.getSnapshot();
  controller.presenter.next();
  assert.equal(controller.getSnapshot(), third);
});

test('explicit controls can advance, jump and go back across API-only steps', () => {
  const controller = createPresentationController(deck);
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  controller.controls.next();
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('interaction', 'finished'),
  );
  controller.controls.previous();
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('interaction', 'slider'),
  );
  controller.controls.goTo({ slideId: 'closing', stepId: 'start' });
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('closing', 'start'),
  );
});

test('completion advances an API-only step at most once, even with duplicate callbacks', () => {
  const controller = createPresentationController(deck);
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  const complete = controller.captureStepCompletion();
  const duplicate = controller.captureStepCompletion();
  complete();
  const completed = controller.getSnapshot();
  assert.deepEqual(completed.current, cursor('interaction', 'finished'));
  complete();
  duplicate();
  assert.equal(controller.getSnapshot(), completed);
});

test('completion captured before leaving is stale even after revisiting the same step', () => {
  const controller = createPresentationController(deck);
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  const staleCompletion = controller.captureStepCompletion();
  controller.controls.previous();
  controller.controls.next();
  const revisit = controller.getSnapshot();
  staleCompletion();
  assert.equal(controller.getSnapshot(), revisit);
  controller.captureStepCompletion()();
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('interaction', 'finished'),
  );
});

test('blocked and unchanged navigation do not invalidate the current completion callback', () => {
  const controller = createPresentationController(deck);
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  const complete = controller.captureStepCompletion();
  controller.presenter.next();
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  complete();
  assert.deepEqual(
    controller.getSnapshot().current,
    cursor('interaction', 'finished'),
  );
});

test('subscribers synchronously receive changes, stable snapshots survive no-ops, and unsubscribe works', () => {
  const controller = createPresentationController(deck);
  const initial = controller.getSnapshot();
  const observed: ReturnType<typeof controller.getSnapshot>[] = [];
  const unsubscribe = controller.subscribe(() =>
    observed.push(controller.getSnapshot()),
  );
  assert.equal(controller.getSnapshot(), initial);
  assert.equal(observed.length, 0);
  controller.controls.previous();
  controller.controls.goTo({ slideId: 'opening', stepId: 'start' });
  assert.equal(controller.getSnapshot(), initial);
  assert.equal(observed.length, 0);
  controller.controls.next();
  assert.equal(observed.length, 1);
  assert.equal(observed[0], controller.getSnapshot());
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  controller.presenter.next();
  assert.equal(observed.length, 2);
  unsubscribe();
  unsubscribe();
  controller.controls.next();
  assert.equal(observed.length, 2);
});

test('separate presentation controllers do not share state, listeners, or completions', () => {
  const first = createPresentationController(deck);
  const second = createPresentationController(deck);
  const secondInitial = second.getSnapshot();
  let secondNotifications = 0;
  second.subscribe(() => secondNotifications++);
  first.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  first.captureStepCompletion()();
  assert.equal(second.getSnapshot(), secondInitial);
  assert.equal(secondNotifications, 0);
  second.presenter.next();
  assert.deepEqual(
    first.getSnapshot().current,
    cursor('interaction', 'finished'),
  );
  assert.equal(secondNotifications, 1);
});

test('runtime validation rejects malformed policies and overrides of nonexistent steps', () => {
  const invalidDefinitions = [
    { advance: 'sometimes' },
    { advance: null },
    { stepAdvance: null },
    { stepAdvance: 'api-only' },
    { stepAdvance: [] },
    { stepAdvance: { missing: 'api-only' } },
    { stepAdvance: { start: 'sometimes' } },
    { stepAdvance: { start: null } },
  ];
  for (const definition of invalidDefinitions) {
    const untrustedDeck = [
      { id: 'only', steps: ['start'], ...definition },
    ] as unknown as Parameters<typeof createNavigation>[0];
    assert.throws(
      () => createNavigation(untrustedDeck),
      Error,
      JSON.stringify(definition),
    );
  }
});

test('step IDs matching object prototype names do not bypass slide policy', () => {
  for (const stepId of ['toString', 'constructor', '__proto__']) {
    const controller = createPresentationController([
      {
        id: 'slide',
        steps: [stepId, 'done'],
        advance: 'api-only',
        stepAdvance: {},
      },
    ]);
    const before = controller.getSnapshot();
    controller.presenter.next();
    assert.equal(controller.getSnapshot(), before);
    controller.controls.next();
    assert.equal(controller.getSnapshot().current.stepId, 'done');
  }
});

test('first visits and revisits follow successful navigation in either direction and through jumps', () => {
  const controller = createPresentationController(deck);
  const initial = controller.getSnapshot();
  assert.equal(initial.isFirstVisit, true);
  controller.controls.next();
  const intro = controller.getSnapshot();
  assert.equal(intro.isFirstVisit, true);
  controller.controls.previous();
  assert.equal(controller.getSnapshot().isFirstVisit, false);
  controller.controls.next();
  assert.equal(controller.getSnapshot().isFirstVisit, false);
  controller.controls.goTo({ slideId: 'closing', stepId: 'start' });
  assert.equal(controller.getSnapshot().isFirstVisit, true);
  // A backward arrival can be a first visit: the jump skipped this step.
  controller.controls.previous();
  assert.equal(controller.getSnapshot().isFirstVisit, true);
  controller.controls.goTo({ slideId: 'interaction', stepId: 'intro' });
  assert.equal(controller.getSnapshot().isFirstVisit, false);
  controller.controls.goTo({ slideId: 'closing', stepId: 'start' });
  assert.equal(controller.getSnapshot().isFirstVisit, false);
  // Previously published snapshots never change when a step is revisited.
  assert.equal(initial.isFirstVisit, true);
  assert.equal(intro.isFirstVisit, true);
});

test('initial cursor is visited first without marking earlier steps as visited', () => {
  const controller = createPresentationController(deck, {
    initialCursor: { slideId: 'interaction', stepId: 'slider' },
  });
  assert.deepEqual(controller.getSnapshot(), {
    current: cursor('interaction', 'slider'),
    previous: null,
    isFirstVisit: true,
  });
  controller.controls.previous();
  assert.equal(controller.getSnapshot().isFirstVisit, true);
  controller.controls.next();
  assert.equal(controller.getSnapshot().isFirstVisit, false);
  controller.controls.goTo({ slideId: 'opening', stepId: 'start' });
  assert.equal(controller.getSnapshot().isFirstVisit, true);
});

test('no-ops preserve visit metadata and snapshot identity without premarking future steps', () => {
  const controller = createPresentationController(deck);
  const initial = controller.getSnapshot();
  controller.controls.previous();
  controller.controls.goTo({ slideId: 'opening', stepId: 'start' });
  assert.equal(controller.getSnapshot(), initial);
  assert.equal(initial.isFirstVisit, true);
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  const slider = controller.getSnapshot();
  const completion = controller.captureStepCompletion();
  controller.presenter.next();
  controller.controls.goTo({ slideId: 'interaction', stepId: 'slider' });
  assert.equal(controller.getSnapshot(), slider);
  assert.equal(slider.isFirstVisit, true);
  completion();
  assert.equal(controller.getSnapshot().isFirstVisit, true);
  const finished = controller.getSnapshot();
  completion();
  assert.equal(controller.getSnapshot(), finished);
  controller.controls.goTo({ slideId: 'closing', stepId: 'start' });
  const closing = controller.getSnapshot();
  controller.controls.next();
  assert.equal(controller.getSnapshot(), closing);
  assert.equal(closing.isFirstVisit, true);
});

test('visit metadata is synchronous for observers and isolated to each controller session', () => {
  const controller = createPresentationController(deck);
  const observed: boolean[] = [];
  controller.subscribe(() => observed.push(controller.getSnapshot().isFirstVisit));
  controller.controls.next();
  controller.controls.previous();
  controller.controls.next();
  assert.deepEqual(observed, [true, false, false]);
  const another = createPresentationController(deck);
  assert.equal(another.getSnapshot().isFirstVisit, true);
  another.controls.next();
  assert.equal(another.getSnapshot().isFirstVisit, true);
  assert.equal(controller.getSnapshot().isFirstVisit, false);
});

test('visit keys distinguish identical step names and IDs containing separators', () => {
  const specialDeck = [
    { id: 'a', steps: ['b/c', 'b:c', 'b\u0000c'] },
    { id: 'a/b', steps: ['c'] },
    { id: 'a:b', steps: ['c'] },
    { id: 'a\u0000b', steps: ['c'] },
  ] as const;
  const controller = createPresentationController(specialDeck);
  for (let index = 0; index < 6; index++) {
    assert.equal(controller.getSnapshot().isFirstVisit, true);
    controller.controls.next();
  }
  for (let index = 0; index < 5; index++) {
    controller.controls.previous();
    assert.equal(controller.getSnapshot().isFirstVisit, false);
  }
});
