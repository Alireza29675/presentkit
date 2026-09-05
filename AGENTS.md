# PresentKit

This repository is a reusable React + TypeScript + Vite + vanilla-extract foundation for interactive presentations. A particular talk is content built on the foundation. Keep this guide generic: speaker names, event details, storylines, and temporary examples belong in presentation-specific content or notes.

## Working approach

- Read this guide, the README, the deck, and the relevant slide before editing. Inspect Git status so existing experiments and user changes stay intact.
- Create and refine slides and their steps one by one, working with the user on each increment. Only create a whole presentation at once when the user explicitly asks for it. Discuss substantive changes to authoring conventions before expanding the engine.
- When starting a new presentation from a fresh clone, first ask whether the user wants to remove all bundled example content. If they agree, remove the entire example: slides, steps, example-only components, styles, assets, deck wiring, branding, header, navigation UI, and other example chrome. Preserve the reusable engine and leave a minimal runnable starting point. Do not ask again when the user has already answered; refining the bundled example is not a fresh-start cleanup request.
- Keep the foundation useful for future presentations with different subjects, visual styles, layouts, and interactions. Add shared infrastructure when a concrete requirement demonstrates its value.
- Treat reference decks as inspiration unless explicitly asked to reproduce them. Do not invent the rest of a talk ahead of the author's direction.
- Temporary examples are working experiments. Keep their slides, demo styles, deck wiring, and related documentation out of commits unless explicitly authorized. Stage files deliberately; do not use blanket staging when experiments coexist with foundation changes.
- Commit authorized foundation work separately from presentation content. Follow repository commit conventions; never push, publish, or deploy without authorization.

## Architecture and ownership

- `src/main.tsx`: browser bootstrap.
- `src/presentation/controller.ts`: application-owned typed controller for external integrations; create independent instances for independent presentations.
- `src/presentation/Presentation.tsx`: composition of the deck, controller, Stage, and input handling.
- `src/presentation/deck.ts`: ordered slide definitions; narrative order lives here.
- `src/presentation/navigation/`: pure navigation rules and typed contracts, plus the React controller adapter. The pure model imports neither React nor browser APIs nor authored slides.
- `src/presentation/stage/`: typed slide authoring boundary and active-slide lifecycle.
- `src/presentation/url/`: validated slide/step hash restoration and disposable URL synchronization; keep browser concerns outside the navigation model.
- `src/presentation/keyboard/`: presentation key routing and listener lifecycle.
- `src/presentation/slides/<slide-name>/`: the slide entry component and definition.
- `src/presentation/slides/<slide-name>/steps/`: ordered named steps, derived step types, and step-specific scene definitions. Every slide has this folder, including single-step slides.
- `src/presentation/slides/<slide-name>/components/`: meaningful slide-local visual and interactive components. Keep their styles and assets nearby; create this folder when there are components to extract.
- `src/presentation/components/`: components actually shared by multiple slides. Keep talk-specific shared components out of the generic engine.
- Keep pure helpers beside their owning slide or feature. Extract genuinely shared helpers under a descriptive feature name; avoid a catch-all `utils/` folder.
- `src/presentation/theme/`: semantic token contract, complete theme values, generated themes, and minimal global reset. See its README for styling APIs. A talk's palette and typography are replaceable choices, not engine behavior.

Use names that describe presentation responsibilities. Keep files cohesive and imports direct. Avoid generic utility buckets, speculative plugin systems, and abstractions that make a simple slide harder to read. Extract repeated behavior when it has a clear shared purpose.

## Slide and step authoring

- Define the deck and slides outside React; keep their order and IDs stable while mounted.
- Declare named steps once as a readonly tuple in `steps/steps.ts` and derive/export the step type there. Keep scene maps there too; split into named files within `steps/` as definitions grow. A step need not become a separate React component. Register the component with `defineSlide`; retain literal types with `as const` in the deck.
- Keep slide and step IDs stable: URLs use both to restore the exact narrative position on refresh. URL restoration does not persist local interaction values.
- Slide IDs are unique across the deck; step IDs are unique within a slide. Every slide has at least one step.
- A slide renders its complete target state from `stepId`. It must look correct when reached forward, backward, or by a direct jump.
- For several distinct states, prefer an explicit scene map checked with `satisfies Record<Step, ...>` over scattered numeric comparisons or nested conditions.
- Keep arbitrary typed jumps in presentation orchestration: `goTo({ slideId, stepId })`. Slide components receive local next/previous controls, avoiding a dependency cycle on the assembled deck.
- Set `advance: 'api-only'` for a whole slide or typed `stepAdvance` overrides in `steps/` when forward progression belongs to an interaction. Policy controls leaving the current step; backward navigation and explicit API jumps remain available.
- Route keyboard/ordinary Next controls through the controller's `presenter` commands and use `canAdvanceFromControls` for disabled UI. Do not bypass policy by wiring an ordinary Next button to the programmatic API.
- Nested interactions use `usePresentationApi()` under `PresentationApiProvider`. Use its visit-scoped `completeStep` callback for completion events and asynchronous work; capture it when work starts. Use unguarded `next` only for intentional current-position commands. See `navigation/README.md` for external API and reliability semantics.
- Local interaction state survives step changes. Leaving and revisiting a slide resets it because the Stage keys by slide ID. Model persistence explicitly when the presentation requires it.

## TypeScript and clean code

- Preserve strict compiler checks, including unchecked indexed access and exact optional properties. Source files use `.ts` / `.tsx` and explicit type-only imports.
- Use inferred literal types and discriminated unions to make invalid states difficult to express. Keep slide/step pairs correlated rather than accepting independent arbitrary strings.
- Avoid `any`, suppression directives in production, and unchecked assertions. If a generic boundary needs an assertion, validate its inputs and explain the invariant locally.
- Prefer small functions, descriptive names, and straightforward data flow. Comments explain constraints and intent rather than narrating the code.
- Follow adjacent formatting: two-space indentation, single-quoted TypeScript strings, semicolons, readable JSX, and multiline style objects. Use PascalCase for React components and meaningful names for files and folders.
- Keep dependencies minimal. Introduce a library for an actual presentation requirement, with its tradeoff understood.

## Visual and interaction guidance

- A presentation may use any suitable visual language. Do not bake a demo's colors, copy, fonts, or layout into the navigation engine.
- Keep typography legible at presentation distance, hierarchy clear, and spacing deliberate. Check the actual target screen, including shorter laptop viewports.
- Author styles in colocated vanilla-extract `.css.ts` files and import their generated classes. Keep global styles limited to document reset and shared accessibility behavior.
- Consume semantic tokens from `theme/tokens.css.ts` for shared design decisions. Define complete presentation themes against the contract; scope a token override to the slide or panel that needs it.
- Use named style variants for finite states and typed inline styles for continuous geometry. Never create vanilla-extract styles inside render functions. Keep motion tokens and reduced-motion handling together.
- Prefer clear selectors over `!important` overrides. Keep demo-only style compositions out of the foundation commit.
- Animate toward the current target state. Animation completion must not own navigation; interrupted and reversed transitions should settle correctly.
- Honor reduced-motion preferences. Use semantic headings, labelled controls, visible keyboard focus, and sufficient contrast. Hide purely decorative elements from assistive technology.
- Preserve normal keyboard behavior in inputs and interactive controls. Use `data-presentation-keys="local"` for custom demo regions when needed.
- Do not expose implementation details to an audience unless they are intentionally part of the presentation's subject.

## Verification

Use the supported Node version from `package.json` and install with `npm ci`.

- `npm run dev`: local preview on port 5173.
- `npm run typecheck`: strict source and compile-only contract checks.
- `npm test`: colocated navigation behavior tests using Node's native TypeScript support.
- `npm run build`: type checks followed by the production bundle.

For navigation or type-contract changes, verify meaningful behavior and invalid API usage. For visual or interaction changes, check the browser: forward/backward steps, slide crossings, boundaries, direct jumps when applicable, local state behavior, and keyboard isolation. Inspect layout and motion on the intended screen. Scale verification to the change; do not add tests that simply repeat implementation details.

## Maintaining this guidance

Keep this file independent of any one talk. Update it when the foundation's supported architecture or authoring contract changes. `AGENTS.md` is canonical; keep `CLAUDE.md` as a relative symlink to `AGENTS.md` and OpenCode configured to read `AGENTS.md`.

## README scope

Keep README.md up to date as the presentation evolves. It should contain only a general explanation of the presentation's content, brief instructions for running it, and a one-line link to AGENTS.md. Keep temporary examples, architecture explanations, authoring tutorials, style guides, and development history out of the README. Put contributor guidance in AGENTS.md or the relevant focused documentation instead.
