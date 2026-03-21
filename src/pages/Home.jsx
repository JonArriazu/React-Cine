import { useState } from 'react'
import { movies } from '../data/movies'
import MovieList from '../components/MovieList'
import CategoryFilter from '../components/CategoryFilter'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [...new Set(movies.map((movie) => movie.category))]

  const filteredMovies = movies.filter((movie) => {
    const matchesCategory =
      selectedCategory === 'Todas' || movie.category === selectedCategory

    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

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

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar película por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <p>No hay películas que coincidan con la búsqueda.</p>
        </div>
      ) : (
        <MovieList movies={filteredMovies} />
      )}
    </section>
  )
}

export default Home