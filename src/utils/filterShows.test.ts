import { describe, expect, it } from 'vitest'
import type { Show } from '../types/show'
import { filterShows, getGenres } from './filterShows'

// Test data only; the app gets its data from TVmaze.
const base: Show = { id: 1, name: 'Night Watch', genres: ['Drama', 'Mystery'], rating: { average: null }, image: null, summary: null, status: 'Ended', schedule: { days: [], time: '' }, url: '' }
const shows: Show[] = [base, { ...base, id: 2, name: 'Kitchen Club', genres: ['Comedy'], status: 'Running' }, { ...base, id: 3, name: 'Night Shift', genres: ['Drama'] }]

describe('filterShows', () => {
  it('returns all shows when no filters are selected', () => {
    expect(filterShows(shows, '', '').map(s => s.id)).toEqual([1, 2, 3])
  })
  it('matches partial names regardless of case and surrounding whitespace', () => {
    expect(filterShows(shows, '  NIGHT  ', '').map(s => s.id)).toEqual([1, 3])
  })
  it('filters by an exact genre', () => {
    expect(filterShows(shows, '', 'Comedy').map(s => s.id)).toEqual([2])
  })
  it('filters by show status', () => {
    expect(filterShows(shows, '', '', 'Running').map(s => s.id)).toEqual([2])
    expect(filterShows(shows, '', '', 'Ended').map(s => s.id)).toEqual([1, 3])
  })
  it('combines name, genre and status filters', () => {
    expect(filterShows(shows, 'kitchen', 'Comedy', 'Running').map(s => s.id)).toEqual([2])
    expect(filterShows(shows, 'night', 'Drama', 'Running')).toEqual([])
  })
  it('requires both the name and genre to match', () => {
    expect(filterShows(shows, 'night', 'Mystery').map(s => s.id)).toEqual([1])
    expect(filterShows(shows, 'night', 'Comedy')).toEqual([])
  })
  it('returns no matches for an unknown name', () => {
    expect(filterShows(shows, 'zzzz', '')).toEqual([])
  })
  it('restores the list after the search is cleared', () => {
    expect(filterShows(shows, 'Kitchen', '')).toHaveLength(1)
    expect(filterShows(shows, '', '')).toHaveLength(3)
  })
  it('handles empty input data and shows without genres', () => {
    expect(filterShows([], 'night', 'Drama')).toEqual([])
    expect(filterShows([{ ...base, genres: [] }], '', 'Drama')).toEqual([])
  })
  it('does not change the original data', () => {
    const before = JSON.stringify(shows)
    filterShows(shows, 'night', 'Drama')
    getGenres(shows)
    expect(JSON.stringify(shows)).toBe(before)
  })
})

describe('getGenres', () => {
  it('returns unique genres in alphabetical order', () => {
    expect(getGenres(shows)).toEqual(['Comedy', 'Drama', 'Mystery'])
  })
  it('handles an empty list', () => {
    expect(getGenres([])).toEqual([])
  })
})
