interface FavoriteButtonProps {
  selected: boolean
  name: string
  onToggle: () => void
}

export default function FavoriteButton({ selected, name, onToggle }: FavoriteButtonProps) {
  return <button type="button" aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Save'} ${name} ${selected ? 'from' : 'to'} favorites`} onClick={onToggle}>{selected ? 'Remove favorite' : 'Save favorite'}</button>
}
