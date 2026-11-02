import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Show } from '../types/show'
import StatusMessage from '../components/StatusMessage'
import ShowPoster from '../components/ShowPoster'
import SearchableShowField from '../components/SearchableShowField'
import { getComparisonFacts } from '../utils/comparison'

export default function ComparePage() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [firstId, setFirstId] = useState('')
  const [secondId, setSecondId] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadShows() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('https://api.tvmaze.com/shows?page=0', { signal: controller.signal })
        if (!response.ok) throw new Error('Could not load comparison options. Please try again in a moment.')
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

  const first = shows.find(show => String(show.id) === firstId)
  const second = shows.find(show => String(show.id) === secondId)
  const sortedShows = [...shows].sort((a, b) => a.name.localeCompare(b.name))
  const firstFacts = first ? getComparisonFacts(first) : []
  const secondFacts = second ? getComparisonFacts(second) : []
  const labels = ['Rating', 'Genres', 'Status', 'Schedule']

  return (
    <main className="browse-page" id="main-content" tabIndex={-1}>
      <h1>Compare shows</h1>
      <p>Choose two different shows from the first page of the TVmaze catalog. Change a selection to replace it, or select “Choose a show” to remove it.</p>
      {loading && <StatusMessage message="Loading comparison options…" />}
      {!loading && error && <div><StatusMessage message={error} /><button onClick={() => setAttempt(attempt + 1)}>Try again</button></div>}
      {!loading && !error && shows.length === 0 && <StatusMessage message="No shows available to compare." />}
      {!loading && !error && shows.length > 0 && <>
        <div className="search-filters compare-filters">
          <SearchableShowField key={`first-${firstId}`} label="First show" shows={sortedShows} selectedId={firstId} unavailableId={secondId} onChange={setFirstId} />
          <SearchableShowField key={`second-${secondId}`} label="Second show" shows={sortedShows} selectedId={secondId} unavailableId={firstId} onChange={setSecondId} />
          <button disabled={!firstId && !secondId} onClick={() => { setFirstId(''); setSecondId('') }}>Clear comparison</button>
        </div>
        {!first && !second && <StatusMessage message="Choose your first show to start comparing." />}
        {(first || second) && <>
          {(!first || !second) && <StatusMessage message="Choose a show in the other slot to complete the comparison." />}
          <div className="comparison-scroll">
            <table className="comparison-table">
              <caption>Side-by-side show comparison</caption>
              <thead><tr><th scope="col">Feature</th>{[first, second].map((show, index) => <th scope="col" key={index}>{show ? <><ShowPoster src={show.image?.medium} name={show.name} /><Link to={`/shows/${show.id}`}>{show.name}</Link></> : 'Choose a show'}</th>)}</tr></thead>
              <tbody>{labels.map((label, index) => <tr key={label}><th scope="row">{label}</th><td>{first ? firstFacts[index] : '—'}</td><td>{second ? secondFacts[index] : '—'}</td></tr>)}</tbody>
            </table>
          </div>
        </>}
      </>}
      <p className="source-credit">Show data from <a href="https://www.tvmaze.com/">TVmaze</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></p>
    </main>
  )
}
