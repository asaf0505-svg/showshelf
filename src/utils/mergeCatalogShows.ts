import type { Show } from '../types/show'

export function mergeCatalogShows(shows: Show[], additions: Show[]): Show[] {
  const newShows = additions.filter(addition => !shows.some(show => show.id === addition.id))
  if (newShows.length === 0) return [...shows]

  const lowestRatedIds = [...shows]
    .sort((first, second) => {
      const firstRating = first.rating.average ?? Number.POSITIVE_INFINITY
      const secondRating = second.rating.average ?? Number.POSITIVE_INFINITY
      return firstRating - secondRating || first.id - second.id
    })
    .slice(0, newShows.length)
    .map(show => show.id)

  const removedIds = new Set(lowestRatedIds)
  return [...shows.filter(show => !removedIds.has(show.id)), ...newShows]
}
