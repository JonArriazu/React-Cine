import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { movies } from '../data/movies'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'

function MovieDetail() {
  const { id } = useParams()
  const movieId = Number(id)

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

      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      </button>

      <p><strong>Categoría:</strong> {movie.category}</p>
      <p><strong>Año:</strong> {movie.year}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Duración:</strong> {movie.duration} minutos</p>
      <p><strong>Descripción:</strong> {movie.description}</p>

      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </section>
  )
}

export default MovieDetail