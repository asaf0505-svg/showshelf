# ShowShelf — Product Requirements

## Purpose and audience
Help TV viewers browse shows, keep favorites and compare two options. This is a front-end course project with an English interface and a simple structure the student can explain. No accounts, backend, database or paid/key-based API.

## Pages
| Route | Page | User actions |
| --- | --- | --- |
| `/` | Browse | Search loaded shows by name, filter by genre, open details, select favorites or comparison candidates |
| `/shows/:id` | Show Details | View poster, summary, genres, rating, status and schedule; add/remove favorite |
| `/favorites` | Favorites | View saved shows, open details, remove favorites |
| `/compare` | Compare | Select up to two shows, compare rating/genres/status/schedule, replace or remove a selection |

## Simple implementation
React + Vite + TypeScript; React Router for navigation and useParams; native CSS. Use useState and props rather than a state-management library. App owns shared favorites and comparison selections. Store favorite show summaries in localStorage and validate stored data before use. Comparison selections can reset on refresh. Each of at least four shared components (Navigation, ShowCard, SearchFilters, StatusMessage) has its own file and typed props. Types must represent nullable API fields; no any.

Fetch inside useEffect, check response.ok, and clean up pending requests. Render lists with map and show.id as key. Show loading, error/retry, success and empty states. Missing images have a placeholder; missing rating/schedule display “Not available”. Handle invalid/missing show IDs and unknown routes. Render API summaries as plain text, not raw HTML.

## API plan — must be verified in a browser before integration
- List: `https://api.tvmaze.com/shows?page=0`
- Details: `https://api.tvmaze.com/shows/{id}`
- Reference: https://www.tvmaze.com/api
- Inspection results and remaining cross-origin check: [API verification](docs/api-verification.md).
- Initial scope: one loaded page, with a visible explanation that search and genre filters apply only to loaded shows. This is not a search of the complete TVmaze catalog.
- Verify the exact response, null fields, browser CORS and attribution/license requirements before task 2 completes. Include a TVmaze source link in the final app.

## Acceptance criteria
1. When I open Browse, I see loading followed by show cards, or an error with retry; when I search or filter, I see matching loaded shows or an empty-result message.
2. When I open a show or refresh its detail URL, I see that show's information, sensible missing-data fallbacks, or a clear not-found/error message.
3. When I favorite a show and refresh, I see it in Favorites; when I remove it, it disappears and an empty state appears if needed.
4. When I choose two shows in Compare, I see their available facts side by side and can replace or remove either selection.
5. When I use a narrow screen or keyboard navigation, I can read and operate every page; the production build and at least five meaningful logic tests pass.

## Delivery
Public GitHub repository with README, PRD, tasks and an honest PROMPTS log, gradual commits, no console errors. Submission: 5 November 2026 at 10:00 Asia/Jerusalem. Prepare to explain state, props, effects, routes, API data and unit tests in the personal defense.
