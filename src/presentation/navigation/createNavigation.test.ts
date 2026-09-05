import assert from 'node:assert/strict';
import test from 'node:test';
import { createNavigation } from './createNavigation.ts';
import type { CursorFor } from './types.ts';

const deck = [
  { id: 'opening', steps: ['start', 'reveal', 'complete'] },
  { id: 'middle', steps: ['start'] },
  { id: 'closing', steps: ['start', 'complete'] },
] as const;

const cursor = (slideId: string, stepId: string) => ({ slideId, stepId });
const destinations = [
  { slideId: 'opening', stepId: 'start' },
  { slideId: 'opening', stepId: 'reveal' },
  { slideId: 'opening', stepId: 'complete' },
  { slideId: 'middle', stepId: 'start' },
  { slideId: 'closing', stepId: 'start' },
  { slideId: 'closing', stepId: 'complete' },
] as const;

test('next traverses every step and crosses slides, and previous reverses that journey', () => {
  const navigation = createNavigation(deck);
  let state = navigation.initialState;
  assert.deepEqual(state, { current: destinations[0], previous: null });

  for (const destination of destinations.slice(1)) {
    const origin: CursorFor<typeof deck> = state.current;
    state = navigation.reducer(state, { type: 'next' });
    assert.deepEqual(state, { current: destination, previous: origin });
  }

  for (const destination of destinations.slice(0, -1).reverse()) {
    const origin: CursorFor<typeof deck> = state.current;
    state = navigation.reducer(state, { type: 'previous' });
    assert.deepEqual(state, { current: destination, previous: origin });
  }
});

test('first and last boundaries preserve state and the previous navigation origin', () => {
  const { initialState, reducer, getPosition } = createNavigation(deck);
  assert.equal(reducer(initialState, { type: 'previous' }), initialState);
  const last = reducer(initialState, { type: 'goTo', ...destinations[5] });
  assert.equal(reducer(last, { type: 'next' }), last);
  const firstPosition = getPosition(initialState.current);
  const lastPosition = getPosition(last.current);
  assert.ok(firstPosition);
  assert.ok(lastPosition);
  assert.equal(firstPosition.canGoPrevious, false);
  assert.equal(firstPosition.canGoNext, true);
  assert.equal(lastPosition.canGoPrevious, true);
  assert.equal(lastPosition.canGoNext, false);

  const single = createNavigation([{ id: 'only', steps: ['only'] }]);
  assert.equal(single.reducer(single.initialState, { type: 'next' }), single.initialState);
  assert.equal(single.reducer(single.initialState, { type: 'previous' }), single.initialState);
});

test('direct jumps reach complete destinations without visiting intermediate steps', () => {
  const { initialState, reducer, getPosition } = createNavigation(deck);
  const last = reducer(initialState, { type: 'goTo', ...destinations[5] });
  assert.deepEqual(last, { current: destinations[5], previous: destinations[0] });
  assert.deepEqual(getPosition(last.current), {
    ...destinations[5], slideIndex: 2, stepIndex: 1, index: 5,
    canGoPrevious: true, canGoNext: false,
  });

  const backward = reducer(last, { type: 'goTo', ...destinations[1] });
  assert.deepEqual(backward, { current: destinations[1], previous: destinations[5] });
  assert.deepEqual(reducer(backward, { type: 'next' }).current, destinations[2]);
});

test('invalid, incomplete, and unchanged destinations are no-ops', () => {
  const { initialState, reducer, getPosition } = createNavigation(deck);
  const state = reducer(initialState, { type: 'next' });
  for (const target of [
    cursor('missing', 'start'), cursor('opening', 'missing'), cursor('middle', 'reveal'),
    { slideId: 'closing' }, { stepId: 'start' }, {}, state.current,
  ]) {
    // Simulate malformed input arriving from an untyped integration.
    const action = { type: 'goTo', ...target } as unknown as Parameters<typeof reducer>[1];
    assert.equal(reducer(state, action), state);
  }
  // @ts-expect-error Unknown actions must also remain harmless at runtime.
  assert.equal(reducer(state, { type: 'unknown' }), state);
  assert.equal(getPosition(cursor('missing', 'start')), null);
});

test('stable IDs locate destinations after reordering and step IDs can repeat across slides', () => {
  const { initialState, reducer, getPosition } = createNavigation([...deck].reverse());
  const state = reducer(initialState, { type: 'goTo', slideId: 'opening', stepId: 'complete' });
  assert.deepEqual(state.current, cursor('opening', 'complete'));
  const positions = [getPosition(state.current), getPosition(cursor('opening', 'start')),
    getPosition(cursor('closing', 'start'))];
  for (const position of positions) assert.ok(position);
  assert.deepEqual(positions.map((position) => position?.slideIndex), [2, 2, 0]);
});

test('malformed decks are rejected before navigation begins', () => {
  for (const invalid of [undefined, null, {}, [], [null], [{}],
    [{ id: '', steps: ['start'] }], [{ id: ' ', steps: ['start'] }],
    [{ id: 1, steps: ['start'] }],
    [{ id: 'same', steps: ['a'] }, { id: 'same', steps: ['b'] }],
    [{ id: 'slide' }], [{ id: 'slide', steps: [] }], [{ id: 'slide', steps: 'start' }],
    [{ id: 'slide', steps: ['start', 'start'] }], [{ id: 'slide', steps: [''] }],
    [{ id: 'slide', steps: [' '] }], [{ id: 'slide', steps: [null] }],
  ]) {
    // Deliberately cross the typed boundary to exercise runtime validation.
    const untrustedDeck = invalid as unknown as Parameters<typeof createNavigation>[0];
    assert.throws(() => createNavigation(untrustedDeck), Error, JSON.stringify(invalid));
  }
});

test('rapid sequential actions preserve prior states and retain only the immediate origin', () => {
  const { initialState, reducer } = createNavigation(deck);
  const actions: Parameters<typeof reducer>[1][] = [
    { type: 'next' }, { type: 'next' }, { type: 'next' }, { type: 'previous' },
    { type: 'goTo', ...destinations[5] }, { type: 'previous' },
    { type: 'goTo', ...destinations[1] },
  ];
  const snapshots: [typeof initialState, typeof initialState][] = [];
  let state = initialState;
  for (const action of actions) {
    Object.freeze(state.current);
    Object.freeze(state);
    snapshots.push([state, structuredClone(state)]);
    const origin: CursorFor<typeof deck> = state.current;
    state = reducer(state, action);
    assert.deepEqual(state.previous, origin);
  }
  assert.deepEqual(state, { current: destinations[1], previous: destinations[4] });
  for (const [original, snapshot] of snapshots) assert.deepEqual(original, snapshot);
});
