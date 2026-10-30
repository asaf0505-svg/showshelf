import type { Show } from '../types/show'

// Fictional development fixtures, not live TVmaze results. Removed in task 5.
export const sampleShows: Show[] = [
  {
    id: 1,
    name: 'The Last Lighthouse',
    genres: ['Drama', 'Mystery'],
    rating: { average: 8.2 },
    image: null,
    summary: 'A lighthouse keeper discovers a message from a missing ship.',
    status: 'Running',
    schedule: { time: '20:00', days: ['Monday'] },
    url: '',
  },
  {
    id: 2,
    name: 'Orbit Nine',
    genres: ['Science-Fiction'],
    rating: { average: 0 },
    image: null,
    summary: 'A small research crew explores life on a distant space station.',
    status: 'Ended',
    schedule: { time: '', days: [] },
    url: '',
  },
  {
    id: 3,
    name: 'Saturday Kitchen Club',
    genres: ['Comedy'],
    rating: { average: null },
    image: null,
    summary: null,
    status: 'Running',
    schedule: { time: '', days: [] },
    url: '',
  },
]
