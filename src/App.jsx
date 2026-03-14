import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
