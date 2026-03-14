import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { movies } from '../data/movies'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import Rating from '../components/Rating'

function MovieDetail() {
  const { id } = useParams()
  const movieId = Number(id)

  const movie = movies.find((movie) => movie.id === movieId)

  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState([])

  const [ratings, setRatings] = useState([])
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(savedFavorites.includes(movieId))

    const savedComments = JSON.parse(localStorage.getItem('comments')) || {}
    setComments(savedComments[movieId] || [])

    const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {}
    const movieRatings = savedRatings[movieId] || []

    setRatings(movieRatings)

    if (movieRatings.length > 0) {
      const average =
        movieRatings.reduce((acc, curr) => acc + curr, 0) / movieRatings.length
      setAverageRating(average.toFixed(1))
    } else {
      setAverageRating(0)
    }
  }, [movieId])

  const handleFavoriteToggle = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

    let updatedFavorites

    if (savedFavorites.includes(movieId)) {
      updatedFavorites = savedFavorites.filter(
        (favoriteId) => favoriteId !== movieId
      )
      setIsFavorite(false)
    } else {
      updatedFavorites = [...savedFavorites, movieId]
      setIsFavorite(true)
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const handleAddComment = (newComment) => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || {}

    const updatedMovieComments = [...(savedComments[movieId] || []), newComment]

    const updatedComments = {
      ...savedComments,
      [movieId]: updatedMovieComments,
    }

    localStorage.setItem('comments', JSON.stringify(updatedComments))
    setComments(updatedMovieComments)
  }

  const handleRatingSubmit = (movieId, newRating) => {
    const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {}

    const movieRatings = savedRatings[movieId] || []
    const updatedRatings = [...movieRatings, newRating]

    const updatedAllRatings = {
      ...savedRatings,
      [movieId]: updatedRatings,
    }

    localStorage.setItem('ratings', JSON.stringify(updatedAllRatings))
    setRatings(updatedRatings)

    const average =
      updatedRatings.reduce((acc, curr) => acc + curr, 0) /
      updatedRatings.length

    setAverageRating(average.toFixed(1))
  }

  if (!movie) {
    return <h2>Película no encontrada</h2>
  }

  return (
    <section className="movie-detail">
      <h2>{movie.title}</h2>

      <img
        src={movie.image}
        alt={movie.title}
        className="movie-detail-poster"
      />

      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      </button>

      <p><strong>Categoría:</strong> {movie.category}</p>
      <p><strong>Año:</strong> {movie.year}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Duración:</strong> {movie.duration} minutos</p>
      <p><strong>Descripción:</strong> {movie.description}</p>

      <div className="rating-section">
        <h3>Valoración media</h3>

        {ratings.length > 0 ? (
          <p>
            {averageRating} / 5 ({ratings.length} valoración
            {ratings.length !== 1 ? 'es' : ''})
          </p>
        ) : (
          <p>Esta película aún no tiene valoraciones.</p>
        )}

        <Rating movieId={movieId} onRatingSubmit={handleRatingSubmit} />
      </div>

      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </section>
  )
}

export default MovieDetail