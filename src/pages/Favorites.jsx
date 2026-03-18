import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'
import { movies } from '../data/movies'

function Favorites() {
  const { user } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadFavorites = async () => {
    setLoading(true)
    setError('')

    try {
      if (!user) {
        setFavoriteIds([])
        setFavoriteMovies([])
        return
      }

      const favoritesRef = doc(db, 'favorites', user.uid)
      const favoritesSnap = await getDoc(favoritesRef)

      const ids = favoritesSnap.exists()
        ? favoritesSnap.data().movieIds || []
        : []

      setFavoriteIds(ids)
      setFavoriteMovies(movies.filter((movie) => ids.includes(movie.id)))
    } catch (error) {
      setError('No se pudieron cargar tus favoritos.')
      setFavoriteIds([])
      setFavoriteMovies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [user])

  const handleRemoveFavorite = async (movieId) => {
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const updatedIds = favoriteIds.filter((id) => id !== movieId)

      await setDoc(doc(db, 'favorites', user.uid), {
        movieIds: updatedIds,
      })

      setFavoriteIds(updatedIds)
      setFavoriteMovies(movies.filter((movie) => updatedIds.includes(movie.id)))
    } catch (error) {
      setError('No se pudo quitar la película de favoritos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="favorites-page">
      <h2>Mis favoritos</h2>

      {loading && (
        <p className="loading-message">Cargando favoritos...</p>
      )}

      {!loading && error && (
        <p className="form-error">{error}</p>
      )}

      {!loading && !error && !user && (
        <div className="empty-state">
          <p>Inicia sesión para ver tus favoritos.</p>
          <Link to="/" className="back-link">
            Ir al catálogo
          </Link>
        </div>
      )}

      {!loading && !error && user && favoriteMovies.length === 0 && (
        <div className="empty-state">
          <p>Todavía no has añadido películas a favoritos.</p>
          <Link to="/" className="back-link">
            Ir al catálogo
          </Link>
        </div>
      )}

      {!loading && !error && favoriteMovies.length > 0 && (
        <div className="movie-list">
          {favoriteMovies.map((movie) => (
            <article key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="movie-poster"
                />

                <div className="movie-card-body">
                  <h3>{movie.title}</h3>
                  <p><strong>Categoría:</strong> {movie.category}</p>
                  <p><strong>Año:</strong> {movie.year}</p>
                </div>
              </Link>

              <div className="movie-card-body">
                <button
                  onClick={() => handleRemoveFavorite(movie.id)}
                  disabled={loading}
                >
                  Quitar de favoritos
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites