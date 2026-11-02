import { describe, expect, it } from 'vitest'
import type { Show } from '../types/show'
import { mergeCatalogShows } from './mergeCatalogShows'

const createShow = (id: number, name: string, rating: number | null): Show => ({
  id,
  name,
  genres: [],
  rating: { average: rating },
  image: null,
  summary: null,
  status: 'Ended',
  schedule: { days: [], time: '' },
  url: '',
})

const catalog = [
  createShow(1, 'Lowest', 4),
  createShow(2, 'Second lowest', 5),
  createShow(3, 'Popular', 9),
  createShow(4, 'No rating', null),
]

describe('mergeCatalogShows', () => {
  it('adds selected shows and removes the same number of lowest-rated shows', () => {
    const result = mergeCatalogShows(catalog, [createShow(10, 'First pick', 8), createShow(11, 'Second pick', 8.5)])
    expect(result.map(show => show.name)).toEqual(['Popular', 'No rating', 'First pick', 'Second pick'])
  })

  it('does not remove a show when the selected show is already in the catalog', () => {
    expect(mergeCatalogShows(catalog, [catalog[2]]).map(show => show.id)).toEqual([1, 2, 3, 4])
  })

  it('does not change the original catalog', () => {
    mergeCatalogShows(catalog, [createShow(10, 'First pick', 8)])
    expect(catalog.map(show => show.id)).toEqual([1, 2, 3, 4])
  })
})
