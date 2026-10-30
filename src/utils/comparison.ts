import type { Show } from '../types/show'

export function getComparisonFacts(show: Show): string[] {
  return [
    show.rating.average === null ? 'Not available' : `${show.rating.average} / 10`,
    show.genres.join(', ') || 'Not available',
    show.status || 'Not available',
    show.schedule.days.length > 0
      ? `${show.schedule.days.join(', ')}${show.schedule.time ? ` at ${show.schedule.time}` : ''}`
      : 'Not available',
  ]
}
