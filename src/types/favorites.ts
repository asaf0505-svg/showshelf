import type { Show } from './show'

export interface FavoritesProps {
  favorites: Show[]
  onToggleFavorite: (show: Show) => void
}
