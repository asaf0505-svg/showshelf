import ShowCard from '../components/ShowCard'
import StatusMessage from '../components/StatusMessage'
import { sampleShows } from '../data/sampleShows'

export default function BrowsePage() {
  return (
    <main className="browse-page">
      <p className="eyebrow">YOUR NEXT WATCH STARTS HERE</p>
      <h1>Find your next favorite.</h1>
      <p>Explore stories worth making time for.</p>
      <StatusMessage message="Preview: fictional sample shows. Live TVmaze data is coming in a later step." />
      <section className="show-grid" aria-label="Sample shows">
        {sampleShows.map((show) => <ShowCard key={show.id} show={show} />)}
      </section>
    </main>
  )
}
