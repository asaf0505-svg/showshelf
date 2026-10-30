import { Link, useParams } from 'react-router'
import { sampleShows } from '../data/sampleShows'
import StatusMessage from '../components/StatusMessage'

export default function ShowDetailsPage() {
  const { id } = useParams()
  // The URL supplies text. Only accept positive whole-number IDs.
  const showId = id && /^[1-9]\d*$/.test(id) ? Number(id) : null
  const show = sampleShows.find((item) => item.id === showId)

  if (!show) {
    return (
      <main className="browse-page">
        <h1>Show not found</h1>
        <p>This show is not available in the current preview.</p>
        <Link to="/">Back to Browse</Link>
      </main>
    )
  }

  return (
    <main className="browse-page">
      <Link to="/">Back to Browse</Link>
      <StatusMessage message="Preview: fictional sample data, not a live TVmaze show." />
      <div className="show-details">
        {show.image ? (
          <img className="poster" src={show.image.original} alt={`${show.name} poster`} />
        ) : (
          <div className="poster poster-placeholder">No poster available</div>
        )}
        <section aria-labelledby="show-title">
          <h1 id="show-title">{show.name}</h1>
          <p>{show.summary || 'No summary available.'}</p>
          <dl className="show-facts">
            <dt>Genres</dt><dd>{show.genres.join(', ') || 'Not available'}</dd>
            <dt>Rating</dt><dd>{show.rating.average === null ? 'Not available' : `${show.rating.average} / 10`}</dd>
            <dt>Status</dt><dd>{show.status}</dd>
            <dt>Schedule</dt>
            <dd>{show.schedule.days.length > 0 ? show.schedule.days.join(', ') : 'Not available'}{show.schedule.time ? ` at ${show.schedule.time}` : ''}</dd>
          </dl>
        </section>
      </div>
    </main>
  )
}
