import { Filter, RotateCcw, SlidersHorizontal } from "lucide-react";

export default function FilterSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  maxPriceLimit,
  onChangePriceRange,
  minRating,
  onSelectMinRating,
  inStockOnly,
  onToggleInStockOnly,
  sortBy,
  onSelectSortBy,
  onResetFilters,
  totalResults
}) {
  const formattedMaxPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(priceRange);

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <div className="filter-title-group">
          <SlidersHorizontal size={18} className="filter-icon" />
          <h3>Filters</h3>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="btn-reset-filters"
          title="Reset all filters"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      <div className="results-count-banner">
        <span>Showing {totalResults} product{totalResults === 1 ? "" : "s"}</span>
      </div>

      {/* Sort Section */}
      <div className="filter-section">
        <label className="filter-section-title">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSelectSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="featured">Featured / Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <label className="filter-section-title">Category</label>
        <div className="category-pills-list">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="filter-section">
        <div className="slider-label-row">
          <label className="filter-section-title">Max Price</label>
          <span className="slider-current-value">{formattedMaxPrice}</span>
        </div>
        <input
          type="range"
          min="10000"
          max={maxPriceLimit}
          step="5000"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="price-range-slider"
        />
        <div className="slider-min-max">
          <span>₹10,000</span>
          <span>₹3,00,000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="filter-section">
        <label className="filter-section-title">Minimum Rating</label>
        <div className="rating-options">
          {[
            { label: "All Ratings", value: 0 },
            { label: "⭐ 4.5 & up", value: 4.5 },
            { label: "⭐ 4.8 & up", value: 4.8 },
          ].map((item) => (
            <label key={item.value} className="radio-label">
              <input
                type="radio"
                name="minRating"
                checked={minRating === item.value}
                onChange={() => onSelectMinRating(item.value)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="filter-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStockOnly(e.target.checked)}
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
