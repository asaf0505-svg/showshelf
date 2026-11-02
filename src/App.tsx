import './App.css'
import Navigation from './components/Navigation'
import { Route, Routes } from 'react-router'
import BrowsePage from './pages/BrowsePage'
import ShowDetailsPage from './pages/ShowDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import { useState } from 'react'
import type { Show } from './types/show'
import { FAVORITES_KEY, parseFavorites, toggleFavorite } from './utils/favorites'
import FavoritesPage from './pages/FavoritesPage'
import StatusMessage from './components/StatusMessage'
import ComparePage from './pages/ComparePage'

function App() {
  const [favorites, setFavorites] = useState<Show[]>(() => {
    try { return parseFavorites(localStorage.getItem(FAVORITES_KEY)) } catch { return [] }
  })
  const [storageError, setStorageError] = useState('')

  function handleToggleFavorite(show: Show) {
    const nextFavorites = toggleFavorite(favorites, show)
    setFavorites(nextFavorites)
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites))
      setStorageError('')
    } catch {
      setStorageError('Favorites changed for this visit, but could not be saved. They may be lost after refresh.')
    }
  }

  return (
    <>
      <Navigation favoriteCount={favorites.length} />
      {storageError && <StatusMessage message={storageError} />}
      <Routes>
        <Route path="/" element={<BrowsePage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/shows/:id" element={<ShowDetailsPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
