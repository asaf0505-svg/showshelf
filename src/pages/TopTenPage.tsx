import { useEffect, useState } from 'react'
import StatusMessage from '../components/StatusMessage'
import TopTenSection from '../components/TopTenSection'
import type { FavoritesProps } from '../types/favorites'
import type { Show } from '../types/show'
import { developerTopIds, getDeveloperTop } from '../utils/developerTop'
import LoadingCards from '../components/LoadingCards'

export default function TopTenPage({ favorites, onToggleFavorite }: FavoritesProps) {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTopTen() {
      setLoading(true)
      setError('')

      try {
        const responses = await Promise.all(
          developerTopIds.map(id => fetch(`https://api.tvmaze.com/shows/${id}`, { signal: controller.signal })),
        )
        if (responses.some(response => !response.ok)) throw new Error('Could not load the Top 10. Please try again.')
        const data: Show[] = await Promise.all(responses.map(response => response.json()))
        if (!controller.signal.aborted) setShows(data)
      } catch (error) {
        if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Could not load the Top 10.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadTopTen()
    return () => controller.abort()
  }, [attempt])

  const rankedShows = getDeveloperTop(shows)

  return (
    <main className="browse-page top-ten-page" id="main-content" tabIndex={-1}>
      {loading && <LoadingCards count={10} message="Loading Top 10…" />}
      {!loading && error && <div><StatusMessage message={error} /><button onClick={() => setAttempt(attempt + 1)}>Try again</button></div>}
      {!loading && !error && <TopTenSection rankedShows={rankedShows} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      <p className="source-credit">Show data from <a href="https://www.tvmaze.com/">TVmaze</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></p>
    </main>
  )
}
