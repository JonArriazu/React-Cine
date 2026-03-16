import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { movies } from '../data/movies'
import { useAuth } from '../context/AuthContext'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import Rating from '../components/Rating'

function MovieDetail() {
  const { id } = useParams()
  const movieId = Number(id)
  const { user } = useAuth()

  const movie = movies.find((movie) => movie.id === movieId)

  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(savedFavorites.includes(movieId))

    const savedComments = JSON.parse(localStorage.getItem('comments')) || {}
    setComments(savedComments[movieId] || [])
  }, [movieId])

  const handleFavoriteToggle = () => {
    if (!user) return

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

    let updatedFavorites

    if (savedFavorites.includes(movieId)) {
      updatedFavorites = savedFavorites.filter((favoriteId) => favoriteId !== movieId)
      setIsFavorite(false)
    } else {
      updatedFavorites = [...savedFavorites, movieId]
      setIsFavorite(true)
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const handleAddComment = (newComment) => {
    if (!user) return

    const savedComments = JSON.parse(localStorage.getItem('comments')) || {}

    const updatedMovieComments = [...(savedComments[movieId] || []), newComment]

    const updatedComments = {
      ...savedComments,
      [movieId]: updatedMovieComments,
    }

    localStorage.setItem('comments', JSON.stringify(updatedComments))
    setComments(updatedMovieComments)
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

      {user ? (
        <button onClick={handleFavoriteToggle}>
          {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </button>
      ) : (
        <p>Inicia sesión para añadir esta película a favoritos.</p>
      )}

      <p><strong>Categoría:</strong> {movie.category}</p>
      <p><strong>Año:</strong> {movie.year}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Duración:</strong> {movie.duration} minutos</p>
      <p><strong>Descripción:</strong> {movie.description}</p>

      {user ? (
        <Rating movieId={movieId} />
      ) : (
        <p>Inicia sesión para puntuar esta película.</p>
      )}

      {user ? (
        <CommentForm onAddComment={handleAddComment} />
      ) : (
        <p>Inicia sesión para comentar esta película.</p>
      )}

      <CommentList comments={comments} />
    </section>
  )
}

export default MovieDetail