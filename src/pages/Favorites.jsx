import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { movies } from '../data/movies'

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    const filteredMovies = movies.filter((movie) => savedFavorites.includes(movie.id))
    setFavoriteMovies(filteredMovies)
  }, [])

  const handleRemoveFavorite = (movieId) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    const updatedFavorites = savedFavorites.filter((favoriteId) => favoriteId !== movieId)

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    setFavoriteMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    )
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