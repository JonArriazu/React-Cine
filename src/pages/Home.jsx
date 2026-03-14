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
      <h2>Catálogo de películas</h2>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <MovieList movies={filteredMovies} />
    </section>
  )
}

export default Home