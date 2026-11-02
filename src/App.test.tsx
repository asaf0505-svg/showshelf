// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'
import type { Show } from './types/show'
import { FAVORITES_KEY } from './utils/favorites'

const first: Show = { id: 1, name: 'Night Watch', genres: ['Drama'], rating: { average: 8 }, image: null, summary: '<p>A <b>mystery</b> &amp; a story.</p>', status: 'Running', schedule: { days: ['Monday'], time: '20:00' }, url: 'https://www.tvmaze.com/shows/1' }
const second: Show = { ...first, id: 2, name: 'Kitchen Club', genres: ['Comedy'], rating: { average: null }, summary: null }
const lowRatedOne: Show = { ...first, id: 3, name: 'Low Rated One', rating: { average: 4 } }
const lowRatedTwo: Show = { ...first, id: 4, name: 'Low Rated Two', rating: { average: 5 } }
const peakyBlinders: Show = { ...first, id: 269, name: 'Peaky Blinders', rating: { average: 8.5 } }
const prisonBreak: Show = { ...first, id: 541, name: 'Prison Break', rating: { average: 8.2 } }
const developerShows: Record<number, string> = {
  150: 'Shameless',
  169: 'Breaking Bad',
  82: 'Game of Thrones',
  269: 'Peaky Blinders',
  541: 'Prison Break',
  40: 'Death Note',
  29: 'Vikings',
  123: 'Lost',
  76: 'Sons of Anarchy',
  4: 'Arrow',
}
const fetchMock = vi.fn<typeof fetch>()
const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status })
const open = (path = '/') => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

beforeEach(() => {
  localStorage.clear()
  fetchMock.mockReset()
  fetchMock.mockImplementation(async (input) => {
    const url = String(input)
    if (url.endsWith('page=0')) return response([first, second, lowRatedOne, lowRatedTwo])
    if (url.endsWith('/269')) return response(peakyBlinders)
    if (url.endsWith('/541')) return response(prisonBreak)
    const showId = Number(url.split('/').at(-1))
    if (developerShows[showId]) return response({ ...first, id: showId, name: developerShows[showId] })
    if (url.endsWith('/1')) return response(first)
    if (url.endsWith('/2')) return response(second)
    return response({}, 404)
  })
  vi.stubGlobal('fetch', fetchMock)
})
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

it('filters the loaded list, handles no matches and clears both filters', async () => {
  open()
  await screen.findByRole('link', { name: 'Night Watch' })
  fireEvent.change(screen.getByLabelText('Search by name'), { target: { value: ' night ' } })
  expect(screen.queryByRole('link', { name: 'Kitchen Club' })).toBeNull()
  fireEvent.change(screen.getByLabelText('Genre'), { target: { value: 'Comedy' } })
  expect(screen.getByText(/No shows match/)).toBeTruthy()
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'Ended' } })
  fireEvent.change(screen.getByLabelText('Sort by'), { target: { value: 'rating' } })
  fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }))
  expect(screen.getByRole('link', { name: 'Kitchen Club' })).toBeTruthy()
  expect((screen.getByLabelText('Status') as HTMLSelectElement).value).toBe('')
  expect((screen.getByLabelText('Sort by') as HTMLSelectElement).value).toBe('default')
})

it('shows available developer picks with their fixed ranks', async () => {
  open()
  expect(screen.queryByRole('list', { name: 'Developer Top 10' })).toBeNull()
  fireEvent.click(screen.getByRole('link', { name: 'Top 10' }))
  const topTen = await screen.findByRole('list', { name: 'Developer Top 10' })
  expect(within(topTen).getByRole('link', { name: 'Shameless' })).toBeTruthy()
  expect(within(topTen).getByRole('link', { name: 'Peaky Blinders' })).toBeTruthy()
  expect(within(topTen).getByRole('link', { name: 'Prison Break' })).toBeTruthy()
  expect(within(topTen).getByRole('link', { name: 'Lost' })).toBeTruthy()
  expect(within(topTen).getByRole('link', { name: 'Sons of Anarchy' })).toBeTruthy()
  expect(within(topTen).getByLabelText('Rank 4')).toBeTruthy()
  expect(within(topTen).getByLabelText('Rank 5')).toBeTruthy()
  expect(within(topTen).getByLabelText('Rank 8')).toBeTruthy()
  expect(within(topTen).getByLabelText('Rank 9')).toBeTruthy()
})

it('navigates to details and renders API HTML as plain text', async () => {
  open()
  fireEvent.click(await screen.findByRole('link', { name: 'Night Watch' }))
  expect(await screen.findByRole('heading', { name: 'Night Watch' })).toBeTruthy()
  expect(screen.getByText('A mystery & a story.').querySelector('b')).toBeNull()
  fireEvent.click(screen.getByRole('link', { name: 'Back to Browse' }))
  expect(await screen.findByLabelText('Search by name')).toBeTruthy()
})

it('persists favorites across an app remount and removes them', async () => {
  const app = open()
  const favoritesLink = screen.getByRole('link', { name: 'Favorites' })
  expect(within(favoritesLink).getByText('0')).toBeTruthy()
  fireEvent.click(await screen.findByRole('button', { name: 'Save Night Watch to favorites' }))
  expect(within(favoritesLink).getByText('1')).toBeTruthy()
  expect(JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')[0].id).toBe(1)
  app.unmount()
  open('/favorites')
  fireEvent.click(screen.getByRole('button', { name: 'Remove Night Watch from favorites' }))
  expect(screen.getByText(/No favorites yet/)).toBeTruthy()
  expect(localStorage.getItem(FAVORITES_KEY)).toBe('[]')
})

it('asks before clearing all favorites', () => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([first, second]))
  const confirm = vi.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true)
  open('/favorites')
  const clearButton = screen.getByRole('button', { name: 'Clear all favorites' })
  fireEvent.click(clearButton)
  expect(screen.getByRole('link', { name: 'Night Watch' })).toBeTruthy()
  fireEvent.click(clearButton)
  expect(confirm).toHaveBeenCalledTimes(2)
  expect(screen.getByText(/No favorites yet/)).toBeTruthy()
  expect(localStorage.getItem(FAVORITES_KEY)).toBe('[]')
  expect(within(screen.getByRole('link', { name: 'Favorites' })).getByText('0')).toBeTruthy()
})

it('keeps the visit usable when saving to storage fails', async () => {
  open()
  const save = await screen.findByRole('button', { name: 'Save Night Watch to favorites' })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota exceeded') })
  fireEvent.click(save)
  expect(screen.getByText(/could not be saved/)).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Remove Night Watch from favorites' })).toBeTruthy()
})

it('retries a failed API request', async () => {
  fetchMock.mockResolvedValueOnce(response({}, 500))
  open()
  fireEvent.click(await screen.findByRole('button', { name: 'Try again' }))
  expect(await screen.findByRole('link', { name: 'Night Watch' })).toBeTruthy()
})

it('shows empty API results without crashing', async () => {
  fetchMock.mockResolvedValueOnce(response([]))
  open()
  expect(await screen.findByText('No shows available.')).toBeTruthy()
})

it('handles invalid and nonexistent detail IDs', async () => {
  const app = open('/shows/abc')
  expect(screen.getByRole('heading', { name: 'Show not found' })).toBeTruthy()
  expect(fetchMock).not.toHaveBeenCalled()
  app.unmount()
  open('/shows/999')
  expect(await screen.findByRole('heading', { name: 'Show not found' })).toBeTruthy()
})

it('loads a detail URL directly', async () => {
  open('/shows/2')
  expect(await screen.findByRole('heading', { name: 'Kitchen Club' })).toBeTruthy()
  expect(screen.getByText('No summary available.')).toBeTruthy()
})

it('compares two distinct shows and clears selections', async () => {
  open('/compare')
  const firstSelect = await screen.findByLabelText('First show')
  const secondSelect = screen.getByLabelText('Second show')
  fireEvent.change(firstSelect, { target: { value: '1' } })
  expect((within(secondSelect).getByRole('option', { name: 'Night Watch' }) as HTMLOptionElement).disabled).toBe(true)
  fireEvent.change(secondSelect, { target: { value: '2' } })
  const table = screen.getByRole('table')
  expect(within(table).getByRole('link', { name: 'Kitchen Club' })).toBeTruthy()
  expect(within(table).getByText('8 / 10')).toBeTruthy()
  fireEvent.change(firstSelect, { target: { value: '' } })
  expect(screen.getByText(/other slot/)).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Clear comparison' }))
  expect(screen.queryByRole('table')).toBeNull()
})

it('does not update an unmounted Browse page after navigation', async () => {
  let finish: ((value: Response) => void) | undefined
  fetchMock.mockImplementationOnce(() => new Promise(resolve => { finish = resolve }))
  open()
  fireEvent.click(screen.getByRole('link', { name: 'Favorites' }))
  finish?.(response([first, second]))
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Your favorites' })).toBeTruthy())
  expect(screen.queryByRole('link', { name: 'Night Watch' })).toBeNull()
})
