import { useState } from 'react'
import { movies } from '../data/movies'
import MovieList from '../components/MovieList'
import CategoryFilter from '../components/CategoryFilter'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const categories = [...new Set(movies.map((movie) => movie.category))]

  const filteredMovies =
    selectedCategory === 'Todas'
      ? movies
      : movies.filter((movie) => movie.category === selectedCategory)

  return (
    <section className="home-page">
      <section className="hero-zinema">
        <h1>Zinema</h1>
        <div className="hero-line"></div>

        <p>
          Palabra en euskera utilizada para referirse al cine, al arte de contar
          historias a través de imágenes, sonido y emoción.
        </p>
      </section>

      <h2>Catálogo de películas</h2>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <p>No hay películas en esta categoría.</p>
        </div>
      ) : (
        <MovieList movies={filteredMovies} />
      )}
    </section>
  )
}

export default Home