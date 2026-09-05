# URL position synchronization

The presentation owns a hash of the form `#slide=slide-id&step=step-id`. IDs are encoded with URLSearchParams, so spaces, Unicode and reserved characters round-trip.

The application controller resolves the hash and initializes its cursor before React renders. Startup has no previous cursor, so restoration does not look like an advance from the opening. Slide-local interaction values are not restored.

`resolveHash` validates the pair against the deck. Missing or unknown slide IDs fall back to the first slide's first step. A known slide with a missing or unknown step falls back to that slide's first step. The adapter writes the canonical result back to the URL.

`connectPresentationUrl` subscribes to controller changes and uses replaceState, preserving pathname, query string and history.state. Normal steps do not add browser-history entries. It listens to hashchange and popstate for explicit URL edits or browser-history traversal. A direct link is an intentional API jump and can enter an API-only step; ordinary forward controls still respect its policy afterward.

The adapter owns the entire hash; unrelated query parameters remain intact. It does not add routing or persist demo choices. Its host is injectable for tests. Call its returned cleanup when disposing the presentation; the application registers cleanup with Vite's HMR lifecycle.

Keep IDs stable when reordering or editing content. Uniqueness is enforced by the navigation model at controller construction. Renaming IDs changes existing links; decide on aliases explicitly if old links need to remain compatible.
