import { movies } from '../data/movies'
import MovieList from '../components/MovieList'

function Home() {
  return (
    <section>
      <h2>Catálogo de películas</h2>
      <MovieList movies={movies} />
    </section>
  )
}

export default Home