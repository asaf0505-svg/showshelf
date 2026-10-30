# ShowShelf

A front-end TV guide built with React, Vite, TypeScript and React Router. Browse live TVmaze shows, search/filter the loaded catalog, save favorites and compare two shows. English interface, original responsive CSS, no backend or API key.

## Run
Use a current Node.js LTS version with npm.

```sh
npm ci
npm run dev
npm test
npm run test:ui
npm run build
npm run lint
```

Open the URL printed by Vite. On the development machine the verified running server is http://127.0.0.1:5174/. It is local, not a public deployment; it stops when the server process stops. If npm is unavailable in this particular workspace, use `node ../../work/npm-runtime/package/bin/npm-cli.js` in place of `npm`. Other computers should use a normal Node/npm installation.

## Pages
| Route | Purpose |
| --- | --- |
| `/` | Browse the first API page; name search and genre filter work together |
| `/shows/:id` | Directly addressable details, source link and favorite toggle |
| `/favorites` | Saved shows with remove controls and an empty state |
| `/compare` | Two distinct selections, facts table, replacement/removal and clear action |

Favorites are stored only in this browser's localStorage, under `showshelf-favorites`. Saved summaries are snapshots; details fetch current information. Invalid stored entries are discarded. Storage errors display a notice while keeping this visit usable. Comparison selections reset when leaving the page or refreshing.

## API and attribution
- https://api.tvmaze.com/shows?page=0
- https://api.tvmaze.com/shows/{id}
- Documentation: https://www.tvmaze.com/api

Search and comparison options cover the loaded first page, not the full catalog. At verification it contained 240 shows. Requests run inside useEffect with cancellation and loading/error/retry handling. Summaries are converted to plain text; missing or broken posters have a fallback. Data is credited to TVmaze in the UI and is subject to its CC BY-SA terms. No API key, login, proxy or server is used.

## Verification
32 Vitest tests pass: 22 logic tests and 10 component interaction tests. Component tests use jsdom and mocked API responses. Production build and lint pass. `test:ui` starts the Vitest UI successfully; all 32 tests also passed on that invocation.

Real in-app browser checks on 30 October 2026 verified live list/detail API requests, 240 loaded shows, filtering/clear/no-results, detail refresh, favorite save/refresh/remove, comparison, invalid routes and narrow-screen layout at 390px. No console errors or warnings were observed in that session. The server had to run outside the isolated execution sandbox for browsers to reach it. See [verification record](docs/verification.md) for limits and evidence.

## Project documents
- [Requirements](PRD.md)
- [Task sequence](tasks.md)
- [Architecture and data flow](docs/architecture.md)
- [Defense guide in Hebrew](docs/defense-guide.md)
- [Prompt log](PROMPTS.md)
- [Original starter instructions](STARTER-README.md)

## Git history and prompt log
Public repository: https://github.com/asaf0505-svg/showshelf

Created from the course template. Original hooks, scripts and AGENTS.md were preserved. The user explicitly authorized GitHub uploads and later continuous work. The first accumulated setup/routing work was published as one honest snapshot; subsequent features were committed separately. Earlier steps were not retroactively split into invented commits.

This chat began outside the repository. Automatic hook execution has not been verified; current development prompts were passed to the original logger with explicit `codex-manual-bootstrap` / `codex-manual-fallback` labels. Earlier planning messages were not reconstructed. This limitation is disclosed, not presented as a complete automatic history. The student still needs to add their own truthful testing/reflection notes, review the work and practice the defense.

The repository is source hosting, not a deployed website. A production host must serve index.html for application routes to support direct detail URLs and refreshes. Deployment is not required by the supplied assignment.
