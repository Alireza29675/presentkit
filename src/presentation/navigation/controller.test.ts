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
