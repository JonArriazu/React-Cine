import { useParams } from 'react-router'
import { movies } from '../data/movies'

function MovieDetail() {
  const { id } = useParams()

  const movie = movies.find((movie) => movie.id === Number(id))

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

      <p><strong>Categoría:</strong> {movie.category}</p>
      <p><strong>Año:</strong> {movie.year}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Duración:</strong> {movie.duration} minutos</p>
      <p><strong>Descripción:</strong> {movie.description}</p>
    </section>
  )
}

export default MovieDetail