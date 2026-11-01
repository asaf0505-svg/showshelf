import type { Show } from '../types/show'
import { Link } from 'react-router'
import ShowPoster from './ShowPoster'
import { summaryToText } from '../utils/summary'
import FavoriteButton from './FavoriteButton'

interface ShowCardProps {
  show: Show
  isFavorite: boolean
  onToggleFavorite: (show: Show) => void
}

export default function ShowCard({ show, isFavorite, onToggleFavorite }: ShowCardProps) {
  return (
    <article className="show-card">
      <Link className="poster-link" to={`/shows/${show.id}`} aria-label={`View details for ${show.name}`}><ShowPoster src={show.image?.medium} name={show.name} /><span className="poster-action" aria-hidden="true">View series ↗</span></Link>
      <div className="card-content">
        <p className="genres">{show.genres.join(' · ') || 'Genre not available'}</p>
        <h2><Link to={`/shows/${show.id}`}>{show.name}</Link></h2>
        <p className="rating">Rating: {show.rating.average === null ? 'Not available' : `${show.rating.average} / 10`}</p>
        <p className="card-summary">{summaryToText(show.summary)}</p>
        <FavoriteButton selected={isFavorite} name={show.name} onToggle={() => onToggleFavorite(show)} />
      </div>
    </article>
  )
}
