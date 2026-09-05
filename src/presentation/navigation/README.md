# Presentation navigation API

A controller owns one presentation's state. It processes commands synchronously; React reads the same immutable snapshots through `useSyncExternalStore`. The application instance lives in `presentation/controller.ts`. Create separate controllers for separate presentations.

## Configure who may advance

Slide definitions accept an optional default policy and typed per-step overrides:

```ts
defineSlide({
  id: 'demo',
  steps,
  advance: 'controls-and-api',
  stepAdvance: { explore: 'api-only' },
  component: DemoSlide,
});
```

Keep `stepAdvance` alongside the step definitions in `steps/`. Keys must name declared steps. Omitted policies default to `controls-and-api`; a step override takes precedence over the slide default. Set `advance: 'api-only'` to control the entire slide through the API.

Policy governs **leaving the current step in the forward direction**, including crossing from the last step to the next slide. It does not restrict entering the slide, going backward, or deliberate API jumps. This is a presentation interaction rule, not a security boundary.

## Presenter controls

Keyboard and ordinary Next controls use `controller.presenter.next()`. The reducer checks the policy even if the UI forgets to disable a button. The React view exposes `canAdvanceFromControls` for disabled states. Previous remains available for recovery. The keyboard adapter expects the `presenter` property, handles presentation keys without scrolling, and ignores held-key repeats; interactive controls retain their own keyboard behavior.

## From a nested component

Place `PresentationApiProvider` around the presentation. At any depth:

```tsx
const { current, isFirstVisit, completeStep, next, previous } = usePresentationApi();
```

- `completeStep()` advances the visit that produced this callback, at most once. Use it for sliders, videos, timers, and asynchronous completion.
- `next()` / `previous()` are intentional commands against the current position. `next()` bypasses the advance policy and is not deduplicated.
- `current` identifies the active slide and step; guard a particular interaction by its intended step when needed.

Capture `completeStep` when starting asynchronous work. If navigation occurs before it finishes, the callback becomes a no-op, even if the user later revisits the same slide/step. Repeated completion events cannot skip a subsequent step. Cancel obsolete asynchronous work too when possible.

A blocked input or a jump to the unchanged position does not create a new visit. Revisiting a completed interactive step does not automatically complete it again; the interaction decides when to emit a fresh completion event.

## First visits and repeated visits

`isFirstVisit` describes the current slide/step visit. It is available on the controller's `PresentationSnapshot`, the presentation hook result, slide props, and `usePresentationApi()`. The initial cursor is a first visit, including when restored from the URL. Each successful arrival records that exact slide/step pair; skipped steps remain unvisited. Returning by Previous, Next, an API jump, or a URL change sets `isFirstVisit` to `false` for a previously visited step.

The value stays fixed for the entire visit, including rerenders and blocked or unchanged commands. Snapshot identity changes only on successful navigation, preserving visit-scoped completion callbacks. History belongs to one controller in memory: creating a new controller or refreshing resets it. It is bounded by the deck's number of steps and is not persisted in the URL or browser storage.

Use `isFirstVisit` to play an introductory animation once and show its settled content on later visits. `direction` is a separate slide prop: a backward arrival can still be a first visit when earlier navigation skipped that step. The application decides which transitions should animate and must still honor reduced motion preferences.

## Outside React

Import the application-owned `presentationController`, or retain a controller created with `createPresentationController(deck)`:

```ts
controller.controls.next();
controller.controls.previous();
controller.controls.goTo({ slideId: 'demo', stepId: 'explore' });

const complete = controller.captureStepCompletion();
// Retain this callback when starting work; invoke it when that work completes.
complete();
```

The controller's `goTo` keeps slide/step pairs typed against its deck. The generic nested hook intentionally offers relative commands; it does not accept arbitrary string destinations that would lose this type safety. A nested component that needs a specific jump can receive a typed application command.

`getSnapshot()` returns the current immutable `PresentationSnapshot` (`current`, `previous`, and `isFirstVisit`). `subscribe(listener)` returns an unsubscribe function; observers run synchronously for actual changes. Observers should observe, not issue further navigation commands or throw. No-op commands do not notify.

## Reliability checks

Behavior tests cover policies, overrides, boundaries, API bypass, duplicate completions, stale callbacks after revisits, subscriptions, first visits, repeated visits, collision-safe slide/step identities, and controller isolation. Runtime policy validation also checks override keys and values. Compile-only checks cover invalid destinations and policy definitions. Verify actual input isolation and completion in the browser when wiring an interaction.
