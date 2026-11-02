import { Link, NavLink } from 'react-router'

interface NavigationProps {
  favoriteCount: number
}

export default function Navigation({ favoriteCount }: NavigationProps) {
  return (
    <header className="site-header">
      <Link className="brand" to="/"><span className="brand-mark" aria-hidden="true"><span className="brand-play" /></span>ShowShelf<span className="brand-dot" aria-hidden="true">.</span></Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Browse</NavLink>
        <NavLink to="/top-ten">Top 10</NavLink>
        <NavLink to="/favorites">Favorites <span className="favorite-count" aria-hidden="true">{favoriteCount}</span></NavLink>
        <NavLink to="/compare">Compare</NavLink>
      </nav>
    </header>
  )
}
