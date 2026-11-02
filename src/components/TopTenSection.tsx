import type { FavoritesProps } from '../types/favorites'
import type { RankedShow } from '../utils/developerTop'
import ShowCard from './ShowCard'

interface TopTenSectionProps extends FavoritesProps {
  rankedShows: RankedShow[]
}

export default function TopTenSection({ rankedShows, favorites, onToggleFavorite }: TopTenSectionProps) {
  return (
    <section className="top-ten" aria-labelledby="top-ten-heading">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">DEVELOPER'S PICKS</p>
          <h2 id="top-ten-heading">Top 10 shows</h2>
        </div>
        <span>PERSONAL RANKING</span>
      </div>
      <ol className="top-ten-list" aria-label="Developer Top 10">
        {rankedShows.map(({ rank, show }) => (
          <li key={show.id}>
            <span className="rank-badge" aria-label={`Rank ${rank}`}>#{rank}</span>
            <ShowCard show={show} isFavorite={favorites.some(item => item.id === show.id)} onToggleFavorite={onToggleFavorite} />
          </li>
        ))}
      </ol>
    </section>
  )
}
