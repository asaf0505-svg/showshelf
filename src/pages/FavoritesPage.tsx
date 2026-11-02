import { Link } from 'react-router'
import ShowCard from '../components/ShowCard'
import type { FavoritesProps } from '../types/favorites'

interface FavoritesPageProps extends FavoritesProps {
  onClearFavorites: () => void
}

export default function FavoritesPage({ favorites, onToggleFavorite, onClearFavorites }: FavoritesPageProps) {
  function confirmClear() {
    if (window.confirm('Remove all shows from your favorites?')) onClearFavorites()
  }

  return (
    <main className="browse-page" id="main-content" tabIndex={-1}>
      <div className="favorites-heading">
        <h1>Your favorites</h1>
        {favorites.length > 0 && <button className="danger-button" type="button" onClick={confirmClear}>Clear all favorites</button>}
      </div>
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
