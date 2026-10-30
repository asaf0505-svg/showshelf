import { useState } from 'react'

interface ShowPosterProps {
  src: string | undefined
  name: string
}

export default function ShowPoster({ src, name }: ShowPosterProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)

  if (!src || src === failedSource) {
    return <div className="poster poster-placeholder">No poster available</div>
  }

  return <img className="poster" src={src} alt={`${name} poster`} loading="lazy" onError={() => setFailedSource(src)} />
}
