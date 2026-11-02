import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="browse-page" id="main-content" tabIndex={-1}>
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The address does not match a page in ShowShelf.</p>
      <Link to="/">Back to Browse</Link>
    </main>
  )
}
