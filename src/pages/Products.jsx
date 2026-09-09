import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, PlusCircle, Frown, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

export default function Products({
  products,
  loading,
  onOpenAddModal,
  onEditProduct,
  onDeleteProduct,
  onToast
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [priceRange, setPriceRange] = useState(300000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Sync state if URL query params change (e.g. from navbar search or category links)
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");
    if (urlSearch !== null) setSearchQuery(urlSearch);
    if (urlCategory !== null) setSelectedCategory(urlCategory);
  }, [searchParams]);

  // Unique categories list
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...unique];
  }, [products]);

  // Dynamic filter & sort pipeline
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query check (name, brand, description, category)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategory !== "All" && p.category !== selectedCategory) {
          return false;
        }

        // Price range filter
        if (p.price > priceRange) {
          return false;
        }

        // Minimum rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Stock availability
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating-desc") return b.rating - a.rating;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [products, searchQuery, selectedCategory, priceRange, minRating, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange(300000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <div className="products-catalog-page">
      {/* Top Page Header */}
      <div className="catalog-header-bar">
        <div>
          <h1 className="page-heading">Electronics Catalog</h1>
          <p className="page-subheading">
            Browse our full range of enterprise and consumer hardware
          </p>
        </div>

        <Link to="/add-product" className="btn-create-product">
          <PlusCircle size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Main Layout: Sidebar on Left, Content on Right */}
      <div className="catalog-layout">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === "All") {
              searchParams.delete("category");
              setSearchParams(searchParams);
            } else {
              setSearchParams({ ...Object.fromEntries(searchParams), category: cat });
            }
          }}
          priceRange={priceRange}
          maxPriceLimit={300000}
          onChangePriceRange={setPriceRange}
          minRating={minRating}
          onSelectMinRating={setMinRating}
          inStockOnly={inStockOnly}
          onToggleInStockOnly={setInStockOnly}
          sortBy={sortBy}
          onSelectSortBy={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredProducts.length}
        />

        <section className="catalog-main">
          {/* Live In-Page Search Bar */}
          <div className="inpage-search-wrap">
            <Search className="inpage-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by product name, brand (Apple, Sony...), specs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value) {
                  searchParams.delete("search");
                  setSearchParams(searchParams);
                }
              }}
              className="inpage-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="btn-clear-search"
                onClick={() => {
                  setSearchQuery("");
                  searchParams.delete("search");
                  setSearchParams(searchParams);
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Loading or Product Grid */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading electronic catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-catalog-state">
              <Frown size={48} className="empty-icon" />
              <h3>No matching products found</h3>
              <p>Try adjusting your search keywords, price filter, or category.</p>
              <button
                type="button"
                className="btn-reset-large"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={onEditProduct}
                  onDelete={onDeleteProduct}
                  onToast={onToast}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
