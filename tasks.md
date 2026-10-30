# ShowShelf — Build tasks

Work in order. The user authorized uploads and continuous work; keep a genuine commit per completed task. Student review and defense practice remain separate checkpoints. Never reconstruct a fake development history.

- [x] 1. Setup and planning (implementation complete; student review pending)
  Done when: the separate local starter is preserved, the current prompt is logged verbatim, a minimal React/TypeScript app builds, PRD and tasks exist, and logging limitations are documented. Student review/commit remains a separate checkpoint.
- [x] 2. Verify the API in a browser
  Progress: direct browser list/detail inspection passed; response/null cases and official attribution documented in docs/api-verification.md. Actual cross-origin fetch remains unverified because localhost was unreachable from the in-app browser.
  Done when: real cross-origin list and detail fetches succeed, response types/nulls and search scope are recorded, and source/attribution requirements are checked.
- [x] 3. Typed local list and shared components
  Implementation complete: Show type, three clearly labeled fictional fixtures, Navigation, ShowCard and StatusMessage. Build/lint passed. Browser rendering and student review remain pending. This independent task proceeded at the user's request while task 2's local-browser connectivity check remains open; no API integration is claimed.
  Done when: a small temporary typed fixture is displayed using map, unique keys and ShowCard props, with separate Navigation and StatusMessage components.
- [x] 4. Routing and details
  Implementation complete: BrowserRouter, Routes, Link/NavLink, /shows/:id with useParams, and unknown-page/show fallbacks. Build/lint and a temporary MemoryRouter render check passed (three direct detail routes, list links, zero/null values, four invalid IDs and unknown route). Real browser click/refresh verification and student review remain pending; task is not marked fully complete.
  Done when: Browse and /shows/:id work with Link/NavLink and useParams, direct detail refresh works, and unknown IDs/routes have clear fallbacks.
- [x] 5. Real API integration
  Implementation complete: real list/detail fetches inside useEffect, cancellation, loading/error/retry, 404/invalid-ID handling, text-only summaries, poster fallbacks and TVmaze credit. Fixtures removed. Build/lint passed; live browser verification pending after browser-control safety stop. Publication authorized by the user's GitHub upload request.
  Done when: fetch inside useEffect replaces fixtures, list/details display real data, and loading/error/retry/missing-data cases work.
- [x] 6. Search, genre filters and first tests
  Implementation complete: labeled SearchFilters, combined name/genre filtering, clear action, result count, empty state and explicit loaded-page scope. Ten Vitest logic tests, build and lint passed. npm test and npm run test:ui are configured; interactive browser/UI verification is still pending.
  Done when: SearchFilters is a separate typed component, local search scope is visible, empty results work, and meaningful Vitest tests run with npm test and npm run test:ui.
- [x] 7. Favorites
  Implementation complete: shared App state, save/remove controls on Browse and details, /favorites, validated localStorage restoration, empty state and storage-failure notice. Eighteen tests, build and lint pass. Actual browser refresh/persistence verification remains pending.
  Done when: favorites can be added/removed from the app, /favorites is useful, localStorage survives refresh and invalid saved data does not crash the app; relevant logic tests pass.
- [x] 8. Comparison
  Implementation complete: /compare fetches real options, supports two distinct choices, replacement/removal, empty/partial states and a responsive facts table. Twenty-two logic tests, build and lint pass. Browser interaction verification pending.
  Done when: /compare supports two selections, clear comparison fields, replacement/removal and partial/empty states; relevant logic tests pass.
- [x] 9. Responsive styling and accessibility
  Done when: original CSS works on desktop and narrow screens, inputs have labels, keyboard focus is visible and missing posters look intentional.
- [x] 10. Final verification and documentation
  Done when: at least five substantive unit tests, build and lint pass; browser navigation, refresh, favorites persistence and console checks are recorded; README has accurate instructions and API attribution; public repo access is verified.
- [ ] 11. Defense practice
  Done when: the student can explain the data flow, state ownership, props, effects, routes and one test, and locate the code for a proposed small change. Only the student can confirm this checkpoint.

## Final verification update
Tasks 1–10 are implemented. Live browser checks on port 5174 passed on 30 October 2026; earlier pending notes above describe historical checkpoints and are superseded by docs/verification.md. There are 32 passing tests, successful build/lint, and verified live list/detail fetches, refresh persistence, comparison and narrow-screen layouts. Task 11 remains for the student. Automatic hook activation and the student's own reflection notes are still outstanding workflow limitations.

