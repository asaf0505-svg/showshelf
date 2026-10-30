import type { Show } from '../types/show'
import { Link } from 'react-router'
import ShowPoster from './ShowPoster'
import { summaryToText } from '../utils/summary'

interface ShowCardProps {
  show: Show
}

export default function ShowCard({ show }: ShowCardProps) {
  return (
    <article className="show-card">
      <ShowPoster src={show.image?.medium} name={show.name} />
      <div className="card-content">
        <p className="genres">{show.genres.join(' · ') || 'Genre not available'}</p>
        <h2><Link to={`/shows/${show.id}`}>{show.name}</Link></h2>
        <p className="rating">Rating: {show.rating.average === null ? 'Not available' : `${show.rating.average} / 10`}</p>
        <p className="card-summary">{summaryToText(show.summary)}</p>
      </div>
    </article>
  )
}
