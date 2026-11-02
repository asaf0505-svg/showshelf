import { Link, NavLink } from 'react-router'

export default function Navigation() {
  return (
    <header className="site-header">
      <Link className="brand" to="/"><span className="brand-mark" aria-hidden="true"><span className="brand-play" /></span>ShowShelf<span className="brand-dot" aria-hidden="true">.</span></Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Browse</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/compare">Compare</NavLink>
      </nav>
    </header>
  )
}
