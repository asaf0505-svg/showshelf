import type { Show } from '../types/show'

export function filterShows(shows: Show[], query: string, genre: string, status = ''): Show[] {
  const search = query.trim().toLowerCase()
  return shows.filter((show) =>
    show.name.toLowerCase().includes(search) &&
    (genre === '' || show.genres.includes(genre)) &&
    (status === '' || show.status === status),
  )
}

export function getGenres(shows: Show[]): string[] {
  return [...new Set(shows.flatMap((show) => show.genres))].sort()
}
