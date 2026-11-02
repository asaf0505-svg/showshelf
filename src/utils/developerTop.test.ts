import { describe, expect, it } from 'vitest'
import type { Show } from '../types/show'
import { getDeveloperTop } from './developerTop'

const createShow = (id: number, name: string): Show => ({
  id,
  name,
  genres: [],
  rating: { average: 8 },
  image: null,
  summary: null,
  status: 'Ended',
  schedule: { days: [], time: '' },
  url: '',
})

describe('getDeveloperTop', () => {
  it('returns selected shows in the developer ranking order', () => {
    const shows = [createShow(169, 'Breaking Bad'), createShow(150, 'Shameless'), createShow(82, 'Game of Thrones')]
    expect(getDeveloperTop(shows).map(item => [item.rank, item.show.name])).toEqual([
      [1, 'Shameless'],
      [2, 'Breaking Bad'],
      [3, 'Game of Thrones'],
    ])
  })

  it('keeps the original rank when another selected show is unavailable', () => {
    expect(getDeveloperTop([createShow(269, 'Peaky Blinders')])[0].rank).toBe(4)
  })

  it('ignores shows that are not part of the top ten', () => {
    expect(getDeveloperTop([createShow(999, 'Another Show')])).toEqual([])
  })

  it('keeps Lost before Sons of Anarchy', () => {
    const shows = [
      createShow(76, 'Sons of Anarchy'),
      createShow(123, 'Lost'),
    ]

    expect(
      getDeveloperTop(shows).map(({ rank, show }) => [rank, show.name]),
    ).toEqual([
      [8, 'Lost'],
      [9, 'Sons of Anarchy'],
    ])
  })
})
