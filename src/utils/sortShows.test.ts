import { describe, expect, it } from 'vitest'
import type { Show } from '../types/show'
import { sortShows } from './sortShows'

const base: Show = { id: 1, name: 'Beta Show', genres: [], rating: { average: 7 }, image: null, summary: null, status: 'Ended', schedule: { days: [], time: '' }, url: '' }
const shows: Show[] = [
  base,
  { ...base, id: 2, name: 'Alpha Show', rating: { average: 9 } },
  { ...base, id: 3, name: 'No Rating', rating: { average: null } },
]

describe('sortShows', () => {
  it('keeps the API order by default', () => {
    expect(sortShows(shows, 'default').map(show => show.id)).toEqual([1, 2, 3])
  })

  it('sorts shows by name', () => {
    expect(sortShows(shows, 'name').map(show => show.name)).toEqual(['Alpha Show', 'Beta Show', 'No Rating'])
  })

  it('sorts ratings from highest to lowest and puts missing ratings last', () => {
    expect(sortShows(shows, 'rating').map(show => show.id)).toEqual([2, 1, 3])
  })

  it('does not change the original list', () => {
    sortShows(shows, 'rating')
    expect(shows.map(show => show.id)).toEqual([1, 2, 3])
  })
})
