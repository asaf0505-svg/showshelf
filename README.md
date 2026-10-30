# ShowShelf

A TV show guide built with React + Vite + TypeScript. English interface; browsing, details, favorites and comparison are planned.

## Current stage
Browse and show details now request real TVmaze data using fetch inside useEffect. Loading, errors, retry, empty results and missing shows have visible states. Requests are cancelled on unmount. API summaries are displayed as text, and missing or broken posters have a fallback. The fictional fixtures were removed. BrowserRouter is set up in main.tsx, and App.tsx defines the routes; details use useParams. Name search, genre filtering and Vitest logic tests are now implemented. Favorites and comparison remain to be implemented.

Latest verification: the real-data implementation passes build and lint. Live browser behavior is not yet verified: the in-app browser could not reach localhost, and native Chrome automation stopped because it could not confidently determine the browser URL. Earlier fixture/render checks below are historical, not evidence that the new asynchronous screens pass browser tests.

## Run
With a current Node.js LTS release and npm installed:

```sh
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

This machine exposes Node but no npm command. A workspace-local npm runtime was downloaded outside this repository. From this ShowShelf folder, the local equivalent is:

```sh
node ../../work/npm-runtime/package/bin/npm-cli.js run dev
```

Replace `run dev` with `run build` or `run lint` as needed. This fallback is specific to this workspace; other machines with npm do not need it.

## Tests
Setup verification: production build and lint completed successfully. Original agent instructions and hook/script files were verified unchanged. Browser rendering and automatic hook activation have not yet been verified.

After the sample-list implementation, build and lint passed again. Visual rendering has not been verified: the in-app browser could not reach the local server using either localhost or 127.0.0.1. The sample includes rating 0 to make the distinction between a valid zero and a missing (null) rating easy to inspect. In the browser, check that there are three cards, the zero appears as `0 / 10`, the missing rating says `Not available`, and the grid fits a narrow window.

Vitest and its UI are installed. Run `npm test` for a single test run or `npm run test:ui` for the interactive runner. Ten tests pass for name search, genre filtering, combined filters, clearing search, missing/empty data, non-mutation and unique sorted genres. Build and lint also pass. The interactive UI has not yet been checked in a browser.

## Search and filtering
Browse now has labeled name search, a genre selector, a clear-filters button and a result count. Both filters apply together to the loaded first page only. Search ignores case and surrounding spaces. A message appears when there are no matches. BrowsePage owns the two state values, passes them and change handlers to SearchFilters, and uses the pure filterShows function to calculate the visible list. This feature does not send a network request for each keystroke. Favorites and comparison remain pending.

## Routing checks
After adding routing, build and lint passed. A temporary render check outside the repository verified the three direct detail URLs, card links, zero and missing values, invalid show IDs and unknown pages using MemoryRouter. This does not count as the required Vitest suite and does not verify browser clicks or refreshes.

To check manually, start the dev server, click a series title, return using Browse, then open and refresh `/shows/2`. Check `/shows/abc` and `/unknown`. These should show “Show not found” and “Page not found”, respectively. Browser verification remains pending because the in-app browser cannot reach the local server. Production hosting must serve index.html for application routes so direct links and refreshes work; public GitHub source hosting alone is not an application deployment.

Routing reference: https://reactrouter.com/start/declarative/routing

## Planned API
Reference: https://www.tvmaze.com/api
- List: https://api.tvmaze.com/shows?page=0
- Details: https://api.tvmaze.com/shows/1 (replace 1 with the selected ID)
- Search/filtering initially covers only the loaded list, not the entire catalog.
- Response inspection and attribution review are recorded in [API verification](docs/api-verification.md). Actual cross-origin browser fetch is still pending; direct JSON navigation passed.

## Workflow
Read PRD.md for requirements and tasks.md for the sequence. Keep the code simple and explainable. AGENTS.md normally reserves commits for the student. On 30 October 2026 the student explicitly asked the assistant to upload the project to GitHub, authorizing this initial publication. The accumulated setup and routing work is recorded as one honest snapshot, not retroactively split into an invented sequence of commits. Student review and browser verification remain pending.

## Starter and prompt logging
Original: https://github.com/YarivGilad/react-project-starter
The original README is preserved as STARTER-README.md. Instructions, hooks and scripts remain intact.

This chat began outside the new repository, so the current message could not trigger its hook. The assistant passed the current user message verbatim to the original logger and verified the complete entry. It is labeled `codex-manual-bootstrap` with Asia/Jerusalem time. No earlier messages were reconstructed.

This verifies the script, NOT automatic hook execution in this chat. Open ShowShelf as the active project and send a new message, then inspect PROMPTS.md before the next development task. If the hook does not run, use the original README's documented fallback and record that fact. No student testing/reflection note has been invented.

## GitHub
Public repository: https://github.com/asaf0505-svg/showshelf

Created from the course template on 30 October 2026. The original template files and initial repository commit are preserved. This repository contains source code; it is not a deployed website. The first application snapshot includes the current planning, sample list and routing work, with incomplete checks documented above.

