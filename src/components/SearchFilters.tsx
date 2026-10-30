interface SearchFiltersProps {
  query: string
  genre: string
  genres: string[]
  onQueryChange: (query: string) => void
  onGenreChange: (genre: string) => void
  onClear: () => void
}

export default function SearchFilters({ query, genre, genres, onQueryChange, onGenreChange, onClear }: SearchFiltersProps) {
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
      <button type="button" onClick={onClear} disabled={!query && !genre}>Clear filters</button>
    </div>
  )
}
