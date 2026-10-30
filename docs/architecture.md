# Architecture

## Components
`main.tsx` mounts BrowserRouter and App. App defines Routes and owns favorites because Browse, Details and Favorites share that state. It passes the list and toggle handler through typed props. No Redux, context framework or backend.

Pages: BrowsePage, ShowDetailsPage, FavoritesPage, ComparePage; NotFoundPage handles unknown URLs. Shared components: Navigation, ShowCard, ShowPoster, SearchFilters, StatusMessage, FavoriteButton. Each has a separate file.

## Data flow
1. Browse mounts; useEffect starts fetch and loading state.
2. JSON becomes a Show array in state; filterShows derives the visible list from query/genre state.
3. map creates a ShowCard for each result; show.id is its key and part of its detail link.
4. React Router matches /shows/:id; useParams supplies the ID as text. Details validates it and requests that show.
5. A favorite button calls the handler received through props. App computes the next array, updates state and writes JSON to localStorage.
6. FavoritesPage renders that shared array; startup reads and validates saved JSON.
7. ComparePage owns its two IDs locally and independently fetches the first catalog page. getComparisonFacts converts fields into readable table cells.

## Effects and errors
Effects include cleanup with AbortController so abandoned requests do not update the page. Retry increments an attempt counter, which triggers the effect again. Details distinguishes 404, invalid IDs and network failures. Favorites storage writes occur in the click handler, not on every render. React escapes summary text; we do not insert external HTML into the rendered document.

## Testing
Pure utilities are tested without React. App.test.tsx exercises user actions in jsdom with controlled fetch responses. These make errors and storage failures reproducible; real browser checks separately verify CORS, images, persistence and responsive CSS.
