import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">

      <Link to={`/movie/${movie.id}`}>

        <div className="movie-image-wrapper">
          <img
            src={movie.image}
            alt={movie.title}
            className="movie-poster"
          />
        </div>

        <div className="movie-card-body">
          <h3>{movie.title}</h3>

          <p>
            <strong>Categoría:</strong> {movie.category}
          </p>

          <p>
            <strong>Año:</strong> {movie.year}
          </p>
        </div>

      </Link>

    </article>
  );
}

export default MovieCard;