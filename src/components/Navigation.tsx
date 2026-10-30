import { Link, NavLink } from 'react-router'

export default function Navigation() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">ShowShelf</Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Browse</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
    </header>
  )
}
