function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <section>
      <label htmlFor="category">Filtrar por categoría: </label>

      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="Todas">Todas</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  )
}

export default CategoryFilter