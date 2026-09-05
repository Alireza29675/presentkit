import assert from 'node:assert/strict';
import test from 'node:test';
import { createPresentationController } from '../navigation/createPresentationController.ts';
import { connectPresentationUrl, resolveHash } from './presentationUrl.ts';

const deck = [
  { id: 'opening', steps: ['start'] },
  {
    id: 'interaction',
    steps: ['explore', 'reflect'],
    stepAdvance: { explore: 'api-only' },
  },
  { id: 'closing', steps: ['end'] },
] as const;

type LocationEvent = 'hashchange' | 'popstate';

function createHost(hash = '') {
  const listeners = new Map<LocationEvent, Set<() => void>>();
  const replacements: { data: unknown; url: string }[] = [];
  const location = { pathname: '/talk/', search: '?presenter=true', hash };
  const history = {
    state: { existing: 'application state' } as unknown,
    replaceState(data: unknown, _unused: string, url: string) {
      replacements.push({ data, url });
      history.state = data;
      location.hash = new URL(url, 'https://presentation.test').hash;
    },
  };

  return {
    location,
    history,
    replacements,
    listeners,
    addEventListener(event: LocationEvent, listener: () => void) {
      const callbacks = listeners.get(event) ?? new Set<() => void>();
      callbacks.add(listener);
      listeners.set(event, callbacks);
    },
    removeEventListener(event: LocationEvent, listener: () => void) {
      listeners.get(event)?.delete(listener);
    },
    navigate(hash: string, event: LocationEvent = 'hashchange') {
      location.hash = hash;
      for (const listener of listeners.get(event) ?? []) listener();
    },
  };
}

test('URL restoration preserves a valid slide and step and tolerates missing or stale IDs', () => {
  assert.deepEqual(resolveHash(deck, '#slide=interaction&step=reflect'), {
    slideId: 'interaction', stepId: 'reflect',
  });
  for (const hash of ['', '#', '#slide=unknown&step=reflect', '#step=reflect']) {
    assert.deepEqual(resolveHash(deck, hash), {
      slideId: 'opening', stepId: 'start',
    }, hash);
  }
  for (const hash of [
    '#slide=interaction',
    '#slide=interaction&step=renamed',
    '#slide=interaction&step=start',
    '#slide=interaction&step=',
    '#slide=interaction&step=%E0%A4%A',
  ]) {
    assert.deepEqual(resolveHash(deck, hash), {
      slideId: 'interaction', stepId: 'explore',
    }, hash);
  }
});

test('Unicode, spaces and reserved characters round-trip without confusing URL fields', () => {
  const specialDeck = [
    { id: 'first', steps: ['start'] },
    { id: 'موضوع / & = + #', steps: ['مرحله ? & = + # %'] },
  ] as const;
  const controller = createPresentationController(specialDeck);
  const host = createHost();
  const disconnect = connectPresentationUrl(controller, specialDeck, host);
  controller.controls.goTo({
    slideId: 'موضوع / & = + #', stepId: 'مرحله ? & = + # %',
  });
  assert.deepEqual(resolveHash(specialDeck, host.location.hash), {
    slideId: 'موضوع / & = + #', stepId: 'مرحله ? & = + # %',
  });
  assert.equal(new URLSearchParams(host.location.hash.slice(1)).size, 2);
  disconnect();
});

test('a hydrated controller starts at its URL position without a previous cursor', () => {
  const initialCursor = resolveHash(deck, '#slide=interaction&step=reflect');
  const controller = createPresentationController(deck, { initialCursor });
  assert.deepEqual(controller.getSnapshot(), {
    current: { slideId: 'interaction', stepId: 'reflect' }, previous: null,
  });
  const initial = controller.getSnapshot();
  const host = createHost('#slide=interaction&step=reflect');
  const disconnect = connectPresentationUrl(controller, deck, host);
  assert.equal(controller.getSnapshot(), initial);
  assert.equal(host.replacements.length, 0);
  assert.deepEqual(createPresentationController(deck).getSnapshot(), {
    current: { slideId: 'opening', stepId: 'start' }, previous: null,
  });
  disconnect();
});

test('connecting restores location, then updates it without adding history entries or losing other URL state', () => {
  const controller = createPresentationController(deck);
  const host = createHost('#slide=interaction&step=reflect');
  const historyState = host.history.state;
  const disconnect = connectPresentationUrl(controller, deck, host);
  assert.deepEqual(controller.getSnapshot().current, {
    slideId: 'interaction', stepId: 'reflect',
  });
  assert.equal(host.replacements.length, 0);
  controller.controls.next();
  assert.equal(host.location.hash, '#slide=closing&step=end');
  assert.deepEqual(host.replacements, [{
    data: historyState,
    url: '/talk/?presenter=true#slide=closing&step=end',
  }]);
  assert.equal(host.history.state, historyState);
  controller.controls.next();
  assert.equal(host.replacements.length, 1);
  disconnect();
});

test('invalid locations are canonicalized even when the fallback does not change the controller', () => {
  const controller = createPresentationController(deck);
  const host = createHost('#slide=missing');
  const initial = controller.getSnapshot();
  const disconnect = connectPresentationUrl(controller, deck, host);
  assert.equal(controller.getSnapshot(), initial);
  assert.equal(host.location.hash, '#slide=opening&step=start');
  host.navigate('#slide=interaction&step=removed');
  assert.deepEqual(controller.getSnapshot().current, {
    slideId: 'interaction', stepId: 'explore',
  });
  assert.equal(host.location.hash, '#slide=interaction&step=explore');
  const explored = controller.getSnapshot();
  host.navigate('#slide=interaction&step=also-removed');
  assert.equal(controller.getSnapshot(), explored);
  assert.equal(host.location.hash, '#slide=interaction&step=explore');
  disconnect();
});

test('location events restore explicit destinations across API-only steps and repeated events are no-ops', () => {
  const controller = createPresentationController(deck);
  const host = createHost('#slide=interaction&step=explore');
  const disconnect = connectPresentationUrl(controller, deck, host);
  const explored = controller.getSnapshot();
  controller.presenter.next();
  assert.equal(controller.getSnapshot(), explored);
  const completeOldVisit = controller.captureStepCompletion();
  host.navigate('#slide=closing&step=end');
  assert.deepEqual(controller.getSnapshot().current, {
    slideId: 'closing', stepId: 'end',
  });
  host.navigate('#slide=interaction&step=explore', 'popstate');
  const revisited = controller.getSnapshot();
  assert.deepEqual(revisited.current, {
    slideId: 'interaction', stepId: 'explore',
  });
  completeOldVisit();
  host.navigate('#slide=interaction&step=explore');
  host.navigate('#slide=interaction&step=explore', 'popstate');
  assert.equal(controller.getSnapshot(), revisited);
  assert.equal(host.replacements.length, 0);
  disconnect();
});

test('disconnect removes both location listeners and controller synchronization', () => {
  const controller = createPresentationController(deck);
  const host = createHost('#slide=opening&step=start');
  const disconnect = connectPresentationUrl(controller, deck, host);
  assert.equal(host.listeners.get('hashchange')?.size, 1);
  assert.equal(host.listeners.get('popstate')?.size, 1);
  disconnect();
  disconnect();
  assert.equal(host.listeners.get('hashchange')?.size, 0);
  assert.equal(host.listeners.get('popstate')?.size, 0);
  controller.controls.next();
  assert.equal(host.location.hash, '#slide=opening&step=start');
  const snapshot = controller.getSnapshot();
  host.navigate('#slide=closing&step=end');
  host.navigate('#slide=closing&step=end', 'popstate');
  assert.equal(controller.getSnapshot(), snapshot);
  assert.equal(host.replacements.length, 0);
});
