# Course requirement audit — 1 November 2026

Checked by the assistant against the assignment screenshots and the student's ShowShelf brief. This is evidence of implementation, not a grade or a claim that the student has reviewed it.

| Requirement | Finding and evidence |
| --- | --- |
| Course starter preserved | Git diff against the local template/main reference is empty for AGENTS.md, CLAUDE.md, hooks and scripts. Original README retained as STARTER-README.md. This compares the checked-out template, not future upstream changes. |
| React + Vite + TypeScript | package.json, main.tsx, vite.config.ts; production build passed again today. |
| Typed API and props, no any | types/show.ts and component props; source search found no any. TypeScript build passed. |
| List, details, two useful extra pages | BrowsePage, ShowDetailsPage, FavoritesPage, ComparePage. |
| Routes and navigation | BrowserRouter in main.tsx; Routes in App.tsx; Link/NavLink; useParams in ShowDetailsPage. |
| At least four own components | Six separate files: Navigation, ShowCard, ShowPoster, SearchFilters, StatusMessage, FavoriteButton. |
| State and props | App owns favorites; pages own request/filter/selection state; typed callbacks update favorites. |
| Lists and unique keys | Show lists use show.id; genre options use distinct names. Comparison header uses two fixed slot indices, not a changing show list. |
| Real free API without key | TVmaze list and detail fetches inside useEffect; AbortController cleanup. No backend, login or database. |
| Loading/error/data | Conditional rendering and retry in all fetching pages; empty and invalid-ID states present. |
| Search or filter | Both: case-insensitive name search plus genre. Scope explicitly limited to page 0. |
| Favorites | Browser localStorage, validated restoration, add/remove and save-failure notice. |
| Compare | Two distinct selections, replacement, individual removal and clear. |
| Missing information | Null ratings, summaries and images handled; failed images show placeholder. |
| Unit tests | 22 meaningful utility tests plus 10 component tests; all 32 passed again today. |
| Test scripts | npm test and npm run test:ui configured. UI startup previously checked; visual UI inspection remains unperformed. |
| Build and code checks | Build and lint passed again today. |
| Responsive original CSS | App.css and index.css. Desktop and 390px checks recorded in verification.md. Full accessibility and all-device testing are not claimed. |
| README, PRD, tasks | Present; five When I acceptance criteria; 12 ordered tasks with Done when. |
| Public GitHub | Repository published at https://github.com/asaf0505-svg/showshelf. Student incognito access check remains. |
| Gradual commits | Separate API/filter/favorites/compare/verification/design commits; initial setup/list/routing combined. Do not reconstruct history. |
| Full prompt history | NOT fully satisfied: earlier planning messages missing; original logger used via disclosed manual fallback. Automatic hook activation unverified. Ask lecturer whether this existing history is acceptable; more commits do not resolve it. |
| Student understanding and reflection | Pending student work; see defense-guide.md. No student checks or understanding invented. |

## Verification boundaries
Read all application pages, components, types, utilities and tests. Re-ran tests, build and lint on 1 November. Existing real-browser flow checks are dated in verification.md; a fresh visit to /compare also loaded live TVmaze options today. No production deployment, grading, lecturer approval or student submission was performed.

The application covers the functional course requirements. The remaining process requirements are substantive: review the incomplete prompt history with the lecturer, verify future logging, add truthful personal reflections, practice explaining the code, check anonymous repository access and submit/register for the defense. Do not represent this project as having a complete automatically captured history.
