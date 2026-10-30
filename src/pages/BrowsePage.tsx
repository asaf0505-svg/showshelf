import ShowCard from '../components/ShowCard'
import StatusMessage from '../components/StatusMessage'
import { useEffect, useState } from 'react'
import type { Show } from '../types/show'
import SearchFilters from '../components/SearchFilters'
import { filterShows, getGenres } from '../utils/filterShows'
import type { FavoritesProps } from '../types/favorites'

export default function BrowsePage({ favorites, onToggleFavorite }: FavoritesProps) {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const filteredShows = filterShows(shows, query, genre)
  const genres = getGenres(shows)

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
        if (!controller.signal.aborted) setShows(data)
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
      <p className="eyebrow">YOUR NEXT WATCH STARTS HERE</p>
      <h1>Find your next favorite.</h1>
      <p>Explore stories worth making time for.</p>
      <p>Search and filters apply only to the loaded first page of the TVmaze catalog.</p>
      {loading && <StatusMessage message="Loading shows…" />}
      {!loading && error && <div><StatusMessage message={error} /><button onClick={() => setAttempt(attempt + 1)}>Try again</button></div>}
      {!loading && !error && shows.length === 0 && <StatusMessage message="No shows available." />}
      {!loading && !error && shows.length > 0 && (
        <>
          <SearchFilters query={query} genre={genre} genres={genres} onQueryChange={setQuery} onGenreChange={setGenre} onClear={() => { setQuery(''); setGenre('') }} />
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
