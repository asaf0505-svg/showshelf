import ShowCard from '../components/ShowCard'
import StatusMessage from '../components/StatusMessage'
import { useEffect, useState } from 'react'
import type { Show } from '../types/show'
import SearchFilters from '../components/SearchFilters'
import { filterShows, getGenres } from '../utils/filterShows'
import type { FavoritesProps } from '../types/favorites'
import { sortShows, type SortOption } from '../utils/sortShows'
import { mergeCatalogShows } from '../utils/mergeCatalogShows'
import { getDeveloperTop } from '../utils/developerTop'
import TopTenSection from '../components/TopTenSection'

const catalogPickUrls = [
  'https://api.tvmaze.com/shows/269',
  'https://api.tvmaze.com/shows/541',
]

export default function BrowsePage({ favorites, onToggleFavorite }: FavoritesProps) {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [status, setStatus] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const filteredShows = sortShows(filterShows(shows, query, genre, status), sortBy)
  const genres = getGenres(shows)
  const developerTop = getDeveloperTop(shows)

  useEffect(() => {
    const controller = new AbortController()
    async function loadShows() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('https://api.tvmaze.com/shows?page=0', { signal: controller.signal })
        if (!response.ok) throw new Error(response.status === 429 ? 'Too many requests. Please wait a moment and try again.' : 'Could not load shows. Please try again.')
        const data: Show[] = await response.json()
        if (!Array.isArray(data)) throw new Error('Unexpected response from TVmaze.')
        if (data.length === 0) {
          if (!controller.signal.aborted) setShows([])
          return
        }

        const pickResponses = await Promise.all(catalogPickUrls.map(url => fetch(url, { signal: controller.signal })))
        if (pickResponses.some(pickResponse => !pickResponse.ok)) throw new Error('Could not load the selected shows. Please try again.')
        const picks: Show[] = await Promise.all(pickResponses.map(pickResponse => pickResponse.json()))
        if (!controller.signal.aborted) setShows(mergeCatalogShows(data, picks))
      } catch (error) {
        if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Could not load shows.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    void loadShows()
    return () => controller.abort()
  }, [attempt])

  return (
    <main className="browse-page">
      <div className="browse-hero">
      <p className="eyebrow">THE NEXT EPISODE IS YOURS</p>
      <h1>Find your next favorite.</h1>
      <p className="hero-description">Big stories. Unexpected discoveries.<br />Make room for something worth watching.</p>
      <a className="hero-cta" href="#collection">Explore the collection <span aria-hidden="true">↓</span></a>
      <span className="hero-decoration" aria-hidden="true">PLAY<br />NEXT.</span>
      </div>
      {!loading && !error && developerTop.length > 0 && <TopTenSection rankedShows={developerTop} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      <div className="collection-heading" id="collection"><h2>The collection</h2><span>DISCOVER · SAVE · COMPARE</span></div>
      <p>Search and filters apply only to the loaded first page of the TVmaze catalog.</p>
      {loading && <StatusMessage message="Loading shows…" />}
      {!loading && error && <div><StatusMessage message={error} /><button onClick={() => setAttempt(attempt + 1)}>Try again</button></div>}
      {!loading && !error && shows.length === 0 && <StatusMessage message="No shows available." />}
      {!loading && !error && shows.length > 0 && (
        <>
          <SearchFilters query={query} genre={genre} status={status} sortBy={sortBy} genres={genres} onQueryChange={setQuery} onGenreChange={setGenre} onStatusChange={setStatus} onSortChange={setSortBy} onClear={() => { setQuery(''); setGenre(''); setStatus(''); setSortBy('default') }} />
          <StatusMessage message={`${filteredShows.length} of ${shows.length} shows`} />
          {filteredShows.length === 0 ? (
            <p>No shows match your filters. Try a different name or clear the filters.</p>
          ) : (
            <section className="show-grid" aria-label="Shows">
              {filteredShows.map((show) => <ShowCard key={show.id} show={show} isFavorite={favorites.some(item => item.id === show.id)} onToggleFavorite={onToggleFavorite} />)}
            </section>
          )}
        </>
      )}
      <p className="source-credit">Show data from <a href="https://www.tvmaze.com/">TVmaze</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></p>
    </main>
  )
}
