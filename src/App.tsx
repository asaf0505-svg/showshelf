import './App.css'
import Navigation from './components/Navigation'
import { Route, Routes } from 'react-router'
import BrowsePage from './pages/BrowsePage'
import ShowDetailsPage from './pages/ShowDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/shows/:id" element={<ShowDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
