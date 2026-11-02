import type { SortOption } from '../utils/sortShows'

interface SearchFiltersProps {
  query: string
  genre: string
  status: string
  sortBy: SortOption
  genres: string[]
  onQueryChange: (query: string) => void
  onGenreChange: (genre: string) => void
  onStatusChange: (status: string) => void
  onSortChange: (sortBy: SortOption) => void
  onClear: () => void
}

export default function SearchFilters({ query, genre, status, sortBy, genres, onQueryChange, onGenreChange, onStatusChange, onSortChange, onClear }: SearchFiltersProps) {
  return (
    <div className="search-filters">
      <label>
        Search by name
        <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Enter a show name" />
      </label>
      <label>
        Genre
        <select value={genre} onChange={(event) => onGenreChange(event.target.value)}>
          <option value="">All genres</option>
          {genres.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <label>
        Status
        <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="">All statuses</option>
          <option value="Running">Running</option>
          <option value="Ended">Ended</option>
        </select>
      </label>
      <label>
        Sort by
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value as SortOption)}>
          <option value="default">Featured order</option>
          <option value="name">Name A–Z</option>
          <option value="rating">Highest rated</option>
        </select>
      </label>
      <button type="button" onClick={onClear} disabled={!query && !genre && !status && sortBy === 'default'}>Clear filters</button>
    </div>
  )
}
