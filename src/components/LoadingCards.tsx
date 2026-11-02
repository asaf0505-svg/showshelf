interface LoadingCardsProps {
  count: number
  message: string
}

export default function LoadingCards({ count, message }: LoadingCardsProps) {
  return (
    <section className="loading-cards" aria-label={message}>
      <p className="status-message" role="status">{message}</p>
      <div className="skeleton-grid" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-poster" />
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-line-short" />
              <div className="skeleton-line skeleton-line-title" />
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-line-button" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
