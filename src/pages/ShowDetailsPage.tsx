import { Link, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { Show } from '../types/show'
import StatusMessage from '../components/StatusMessage'
import ShowPoster from '../components/ShowPoster'
import { summaryToText } from '../utils/summary'
import type { FavoritesProps } from '../types/favorites'
import FavoriteButton from '../components/FavoriteButton'

export default function ShowDetailsPage({ favorites, onToggleFavorite }: FavoritesProps) {
  const { id } = useParams()
  // Remount when the URL changes so old details cannot appear for a new ID.
  return <ShowDetailsContent key={id} id={id} favorites={favorites} onToggleFavorite={onToggleFavorite} />
}

function ShowDetailsContent({ id, favorites, onToggleFavorite }: FavoritesProps & { id: string | undefined }) {
  // The URL supplies text. Only accept positive whole-number IDs.
  const showId = id && /^[1-9]\d*$/.test(id) ? Number(id) : null
  const validId = showId !== null && Number.isSafeInteger(showId)
  const [show, setShow] = useState<Show | null>(null)
  const [loading, setLoading] = useState(validId)
  const [notFound, setNotFound] = useState(!validId)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!validId) return
    const controller = new AbortController()
    async function loadShow() {
      setLoading(true)
      setError('')
      setNotFound(false)
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`, { signal: controller.signal })
        if (response.status === 404) {
          if (!controller.signal.aborted) setNotFound(true)
          return
        }
        if (!response.ok) throw new Error(response.status === 429 ? 'Too many requests. Please wait a moment and try again.' : 'Could not load this show. Please try again.')
        const data: Show = await response.json()
        if (data.id !== showId) throw new Error('Unexpected response from TVmaze.')
        if (!controller.signal.aborted) setShow(data)
      } catch (error) {
        if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Could not load this show.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    void loadShow()
    return () => controller.abort()
  }, [showId, validId, attempt])

  if (loading) return <main className="browse-page" id="main-content" tabIndex={-1}><Link to="/">Back to Browse</Link><StatusMessage message="Loading show…" /></main>
  if (error) return <main className="browse-page" id="main-content" tabIndex={-1}><h1>Unable to load show</h1><StatusMessage message={error} /><button onClick={() => setAttempt(attempt + 1)}>Try again</button><p><Link to="/">Back to Browse</Link></p></main>

  if (notFound || !show) {
    return (
      <main className="browse-page" id="main-content" tabIndex={-1}>
        <h1>Show not found</h1>
        <p>Check the address or choose another show from Browse.</p>
        <Link to="/">Back to Browse</Link>
      </main>
    )
  }

  return (
    <main className="browse-page" id="main-content" tabIndex={-1}>
      <Link to="/">Back to Browse</Link>
      <div className="show-details">
        <ShowPoster src={show.image?.original} name={show.name} />
        <section aria-labelledby="show-title">
          <h1 id="show-title">{show.name}</h1>
          <FavoriteButton selected={favorites.some(item => item.id === show.id)} name={show.name} onToggle={() => onToggleFavorite(show)} />
          <p>{summaryToText(show.summary)}</p>
          <dl className="show-facts">
            <dt>Genres</dt><dd>{show.genres.join(', ') || 'Not available'}</dd>
            <dt>Rating</dt><dd>{show.rating.average === null ? 'Not available' : `${show.rating.average} / 10`}</dd>
            <dt>Status</dt><dd>{show.status}</dd>
            <dt>Schedule</dt>
            <dd>{show.schedule.days.length > 0 ? show.schedule.days.join(', ') : 'Not available'}{show.schedule.time ? ` at ${show.schedule.time}` : ''}</dd>
          </dl>
          <p className="source-credit">Show data from <a href={show.url}>TVmaze</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></p>
        </section>
      </div>
    </main>
  )
}
