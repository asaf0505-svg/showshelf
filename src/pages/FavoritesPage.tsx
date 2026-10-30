import { Link } from 'react-router'
import ShowCard from '../components/ShowCard'
import type { FavoritesProps } from '../types/favorites'

export default function FavoritesPage({ favorites, onToggleFavorite }: FavoritesProps) {
  return (
    <main className="browse-page">
      <h1>Your favorites</h1>
      <p>Saved on this browser. Open a show for its latest details.</p>
      {favorites.length === 0 ? <p>No favorites yet. <Link to="/">Browse shows to find your next watch.</Link></p> : (
        <section className="show-grid" aria-label="Favorite shows">
          {favorites.map(show => <ShowCard key={show.id} show={show} isFavorite onToggleFavorite={onToggleFavorite} />)}
        </section>
      )}
      <p className="source-credit">Show data from <a href="https://www.tvmaze.com/">TVmaze</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></p>
    </main>
  )
}
