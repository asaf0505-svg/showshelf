// Only the fields this application needs from a TVmaze show.
export interface Show {
  id: number
  name: string
  genres: string[]
  rating: { average: number | null }
  image: { medium: string; original: string } | null
  summary: string | null
  status: string
  schedule: { time: string; days: string[] }
  url: string
}
