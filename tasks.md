# ShowShelf — Build tasks

Work in order, one task per learning checkpoint. The student reviews and commits each completed task as required by AGENTS.md. Never reconstruct a fake development history.

- [x] 1. Setup and planning (implementation complete; student review/commit pending)
  Done when: the separate local starter is preserved, the current prompt is logged verbatim, a minimal React/TypeScript app builds, PRD and tasks exist, and logging limitations are documented. Student review/commit remains a separate checkpoint.
- [ ] 2. Verify the API in a browser
  Progress: direct browser list/detail inspection passed; response/null cases and official attribution documented in docs/api-verification.md. Actual cross-origin fetch remains unverified because localhost was unreachable from the in-app browser.
  Done when: real cross-origin list and detail fetches succeed, response types/nulls and search scope are recorded, and source/attribution requirements are checked.
- [ ] 3. Typed local list and shared components
  Implementation complete: Show type, three clearly labeled fictional fixtures, Navigation, ShowCard and StatusMessage. Build/lint passed. Browser rendering and student review remain pending. This independent task proceeded at the user's request while task 2's local-browser connectivity check remains open; no API integration is claimed.
  Done when: a small temporary typed fixture is displayed using map, unique keys and ShowCard props, with separate Navigation and StatusMessage components.
- [ ] 4. Routing and details
  Implementation complete: BrowserRouter, Routes, Link/NavLink, /shows/:id with useParams, and unknown-page/show fallbacks. Build/lint and a temporary MemoryRouter render check passed (three direct detail routes, list links, zero/null values, four invalid IDs and unknown route). Real browser click/refresh verification and student review remain pending; task is not marked fully complete.
  Done when: Browse and /shows/:id work with Link/NavLink and useParams, direct detail refresh works, and unknown IDs/routes have clear fallbacks.
- [ ] 5. Real API integration
  Done when: fetch inside useEffect replaces fixtures, list/details display real data, and loading/error/retry/missing-data cases work.
- [ ] 6. Search, genre filters and first tests
  Done when: SearchFilters is a separate typed component, local search scope is visible, empty results work, and meaningful Vitest tests run with npm test and npm run test:ui.
- [ ] 7. Favorites
  Done when: favorites can be added/removed from the app, /favorites is useful, localStorage survives refresh and invalid saved data does not crash the app; relevant logic tests pass.
- [ ] 8. Comparison
  Done when: /compare supports two selections, clear comparison fields, replacement/removal and partial/empty states; relevant logic tests pass.
- [ ] 9. Responsive styling and accessibility
  Done when: original CSS works on desktop and narrow screens, inputs have labels, keyboard focus is visible and missing posters look intentional.
- [ ] 10. Final verification and documentation
  Done when: at least five substantive unit tests, build and lint pass; browser navigation, refresh, favorites persistence and console checks are recorded; README has accurate instructions and API attribution; public repo access is verified.
- [ ] 11. Defense practice
  Done when: the student can explain the data flow, state ownership, props, effects, routes and one test, and locate the code for a proposed small change. Only the student can confirm this checkpoint.
