function MovieCard({ movie }) {
  return (
    <article>
      <img src={movie.image} alt={movie.title} width="200" />
      <h3>{movie.title}</h3>
      <p>Categoría: {movie.category}</p>
      <p>Año: {movie.year}</p>
    </article>
  )
}

export default MovieCard