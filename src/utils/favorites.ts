import type { Show } from '../types/show'

export const FAVORITES_KEY = 'showshelf-favorites'

// Stored JSON is untrusted: check the fields our components read.
function isShow(value: unknown): value is Show {
  if (typeof value !== 'object' || value === null) return false
  const s = value as Record<string, unknown>
  const rating = s.rating as Record<string, unknown> | null
  const schedule = s.schedule as Record<string, unknown> | null
  const image = s.image as Record<string, unknown> | null
  return Number.isSafeInteger(s.id) && Number(s.id) > 0 &&
    typeof s.name === 'string' && typeof s.status === 'string' && typeof s.url === 'string' &&
    Array.isArray(s.genres) && s.genres.every(g => typeof g === 'string') &&
    (s.summary === null || typeof s.summary === 'string') &&
    typeof rating === 'object' && rating !== null &&
    (rating.average === null || (typeof rating.average === 'number' && Number.isFinite(rating.average))) &&
    typeof schedule === 'object' && schedule !== null &&
    typeof schedule.time === 'string' && Array.isArray(schedule.days) && schedule.days.every(d => typeof d === 'string') &&
    (image === null || (typeof image === 'object' && image !== null && typeof image.medium === 'string' && typeof image.original === 'string'))
}

export function parseFavorites(raw: string | null): Show[] {
  if (!raw) return []
  try {
    const values: unknown = JSON.parse(raw)
    if (!Array.isArray(values)) return []
    const shows = values.filter(isShow)
    return shows.filter((show, index) => shows.findIndex(item => item.id === show.id) === index)
  } catch {
    return []
  }
}

export function toggleFavorite(favorites: Show[], show: Show): Show[] {
  return favorites.some(item => item.id === show.id)
    ? favorites.filter(item => item.id !== show.id)
    : [...favorites, show]
}
