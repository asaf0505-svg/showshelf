# ShowShelf

A front-end TV guide built with React, Vite, TypeScript and React Router. Browse live TVmaze shows, search/filter the loaded catalog, view a personal Top 10, save favorites and compare two shows. English interface, original responsive CSS, no backend or API key.

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

Open the local URL printed by Vite. The port can change when another server is already using the default. It is local, not a public deployment; it stops when the server process stops. If npm is unavailable in this particular workspace, use `node ../../work/npm-runtime/package/bin/npm-cli.js` in place of `npm`. Other computers should use a normal Node/npm installation.

## Pages
| Route | Purpose |
| --- | --- |
| `/` | Browse the first API page; name search and genre filter work together |
| `/shows/:id` | Directly addressable details, source link and favorite toggle |
| `/top-ten` | The developer's personal ranking of ten shows from the API catalog |
| `/favorites` | Saved shows with remove controls and an empty state |
| `/compare` | Two distinct selections, facts table, replacement/removal and clear action |

Favorites are stored only in this browser's localStorage, under `showshelf-favorites`. Saved summaries are snapshots; details fetch current information. Invalid stored entries are discarded. Storage errors display a notice while keeping this visit usable. Comparison selections reset when leaving the page or refreshing.

## API and attribution
- https://api.tvmaze.com/shows?page=0
- https://api.tvmaze.com/shows/{id}
- Documentation: https://www.tvmaze.com/api

Search and comparison options cover the loaded first page, not the full catalog. At verification it contained 240 shows. Requests run inside useEffect with cancellation and loading/error/retry handling. Summaries are converted to plain text; missing or broken posters have a fallback. Data is credited to TVmaze in the UI and is subject to its CC BY-SA terms. No API key, login, proxy or server is used.

## Verification
49 Vitest tests across 8 files pass. They cover application interactions, filtering, sorting, favorites, API processing, loading states and the Top 10 ranking. Component tests use jsdom and mocked API responses. Production build and lint pass, and the source contains no `any` usage. `test:ui` is configured; the final verification used the normal headless `npm test` command.

Final in-app browser checks on 2 November 2026 verified 240 live catalog cards, 10 ranked Top 10 cards, the empty Favorites state, two comparison selectors with API options, a two-show comparison table, direct detail refresh, invalid IDs and unknown routes. No console errors or warnings were observed. All five application routes were also checked at a 390px mobile viewport without page-level horizontal overflow. See [verification record](docs/verification.md) for limits and earlier evidence.

## Project documents
- [Short commit labels for the presentation](docs/commit-guide.md)
- [Open and run the project in VS Code (Hebrew)](docs/vscode-guide.md)
- [Course requirement audit and remaining gaps](docs/course-audit.md)
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
