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

  const loadFavorites = async () => {
    if (!user) {
      setFavoriteIds([])
      setFavoriteMovies([])
      return
    }

    const favoritesRef = doc(db, 'favorites', user.uid)
    const favoritesSnap = await getDoc(favoritesRef)

    const ids = favoritesSnap.exists() ? favoritesSnap.data().movieIds || [] : []

    setFavoriteIds(ids)
    setFavoriteMovies(movies.filter((movie) => ids.includes(movie.id)))
  }

  useEffect(() => {
    loadFavorites()
  }, [user])

  const handleRemoveFavorite = async (movieId) => {
    if (!user) return

    const updatedIds = favoriteIds.filter((id) => id !== movieId)

    await setDoc(doc(db, 'favorites', user.uid), {
      movieIds: updatedIds,
    })

    setFavoriteIds(updatedIds)
    setFavoriteMovies(movies.filter((movie) => updatedIds.includes(movie.id)))
  }

  return (
    <section className="favorites-page">
      <h2>Mis favoritos</h2>

      {favoriteMovies.length === 0 ? (
        <p>No tienes películas favoritas todavía.</p>
      ) : (
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
                <button onClick={() => handleRemoveFavorite(movie.id)}>
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