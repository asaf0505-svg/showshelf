import type { Show } from '../types/show'
import { Link } from 'react-router'

interface ShowCardProps {
  show: Show
}

export default function ShowCard({ show }: ShowCardProps) {
  return (
    <article className="show-card">
      {show.image ? (
        <img className="poster" src={show.image.medium} alt={`${show.name} poster`} />
      ) : (
        <div className="poster poster-placeholder">No poster available</div>
      )}
      <div className="card-content">
        <p className="genres">{show.genres.join(' · ') || 'Genre not available'}</p>
        <h2><Link to={`/shows/${show.id}`}>{show.name}</Link></h2>
        <p className="rating">Rating: {show.rating.average === null ? 'Not available' : `${show.rating.average} / 10`}</p>
        <p>{show.summary || 'No summary available.'}</p>
      </div>
    </article>
  )
}
