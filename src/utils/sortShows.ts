import type { Show } from '../types/show'

export type SortOption = 'default' | 'name' | 'rating'

export function sortShows(shows: Show[], sortBy: SortOption): Show[] {
  const sortedShows = [...shows]

  if (sortBy === 'name') {
    return sortedShows.sort((first, second) => first.name.localeCompare(second.name))
  }

  if (sortBy === 'rating') {
    return sortedShows.sort((first, second) => {
      const ratingDifference = (second.rating.average ?? -1) - (first.rating.average ?? -1)
      return ratingDifference || first.name.localeCompare(second.name)
    })
  }

  return sortedShows
}
