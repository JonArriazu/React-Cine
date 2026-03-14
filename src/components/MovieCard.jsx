function MovieCard({ movie }) {
  return (
    <article className="movie-card">
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
    </article>
  )
}

export default MovieCard