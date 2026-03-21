import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Login from './pages/Login'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout theme={theme} toggleTheme={toggleTheme} />}
      >
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="legal" element={<Legal />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App