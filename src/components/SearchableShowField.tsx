import { useId, useState } from 'react'
import type { Show } from '../types/show'

interface SearchableShowFieldProps {
  label: string
  shows: Show[]
  selectedId: string
  unavailableId: string
  onChange: (id: string) => void
}

export default function SearchableShowField({ label, shows, selectedId, unavailableId, onChange }: SearchableShowFieldProps) {
  const listId = useId()
  const selectedShow = shows.find(show => String(show.id) === selectedId)
  const [query, setQuery] = useState(selectedShow?.name ?? '')
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const matchingShows = shows.filter(show => String(show.id) !== unavailableId && show.name.toLocaleLowerCase().includes(normalizedQuery))

  function handleQueryChange(value: string) {
    setQuery(value)
    const exactMatch = shows.find(show => String(show.id) !== unavailableId && show.name.toLocaleLowerCase() === value.trim().toLocaleLowerCase())
    onChange(exactMatch ? String(exactMatch.id) : '')
  }

  return (
    <label>{label}
      <input
        type="search"
        list={listId}
        value={query}
        placeholder="Choose or search for a show"
        autoComplete="off"
        onChange={event => handleQueryChange(event.target.value)}
      />
      <datalist id={listId}>
        {matchingShows.map(show => <option key={show.id} value={show.name} />)}
      </datalist>
    </label>
  )
}
