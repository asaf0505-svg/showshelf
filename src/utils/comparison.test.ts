import { expect, it } from 'vitest'
import type { Show } from '../types/show'
import { getComparisonFacts } from './comparison'

const show: Show = { id: 1, name: 'Test', genres: ['Drama', 'Mystery'], rating: { average: 8 }, image: null, summary: null, status: 'Running', schedule: { days: ['Monday', 'Friday'], time: '20:00' }, url: '' }

it('formats the four comparison facts in table order', () => {
  expect(getComparisonFacts(show)).toEqual(['8 / 10', 'Drama, Mystery', 'Running', 'Monday, Friday at 20:00'])
})
it('distinguishes zero from a missing rating', () => {
  expect(getComparisonFacts({ ...show, rating: { average: 0 } })[0]).toBe('0 / 10')
  expect(getComparisonFacts({ ...show, rating: { average: null } })[0]).toBe('Not available')
})
it('handles missing genres, status and schedule', () => {
  expect(getComparisonFacts({ ...show, genres: [], status: '', schedule: { days: [], time: '' } }).slice(1)).toEqual(['Not available', 'Not available', 'Not available'])
})
it('does not add an at suffix when the time is missing', () => {
  expect(getComparisonFacts({ ...show, schedule: { days: ['Monday'], time: '' } })[3]).toBe('Monday')
})
