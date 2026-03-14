function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={selectedCategory === 'Todas' ? 'active' : ''}
        onClick={() => onCategoryChange('Todas')}
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter