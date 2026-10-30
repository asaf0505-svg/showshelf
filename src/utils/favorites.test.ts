import { describe, expect, it } from 'vitest'
import type { Show } from '../types/show'
import { parseFavorites, toggleFavorite } from './favorites'

const show: Show = { id: 1, name: 'Test show', genres: ['Drama'], rating: { average: null }, image: null, summary: null, status: 'Ended', schedule: { time: '', days: [] }, url: 'https://www.tvmaze.com/shows/1' }

describe('favorites', () => {
  it('adds a show without changing the original array', () => {
    const original: Show[] = []
    expect(toggleFavorite(original, show)).toEqual([show])
    expect(original).toEqual([])
  })
  it('removes a saved show by ID even if its details changed', () => {
    expect(toggleFavorite([show], { ...show, name: 'Updated' })).toEqual([])
  })
  it('preserves other favorites when removing one', () => {
    const other = { ...show, id: 2 }
    expect(toggleFavorite([show, other], show)).toEqual([other])
  })
  it('restores saved shows from JSON including nullable fields', () => {
    expect(parseFavorites(JSON.stringify([show]))).toEqual([show])
  })
  it('recovers from missing, malformed or non-array storage', () => {
    for (const raw of [null, '', '{broken', 'null', '{}', '123']) expect(parseFavorites(raw)).toEqual([])
  })
  it('discards invalid entries while keeping valid ones', () => {
    expect(parseFavorites(JSON.stringify([null, {}, { ...show, genres: 5 }, { ...show, schedule: null }, { ...show, rating: 'bad' }, { ...show, id: -1 }, show]))).toEqual([show])
  })
  it('removes duplicate saved IDs', () => {
    expect(parseFavorites(JSON.stringify([show, show]))).toEqual([show])
  })
  it('accepts complete image data and zero ratings', () => {
    const complete = { ...show, rating: { average: 0 }, image: { medium: 'https://example.com/a.jpg', original: 'https://example.com/b.jpg' } }
    expect(parseFavorites(JSON.stringify([complete]))).toEqual([complete])
  })
})
