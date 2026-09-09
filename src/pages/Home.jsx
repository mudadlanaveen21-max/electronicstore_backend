import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Gamepad2, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Headset, 
  ArrowRight,
  Zap,
  Star
} from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Home({ featuredProducts = [], onEditProduct, onDeleteProduct, onToast }) {
  const categoryHighlights = [
    { name: "Smartphones", icon: <Smartphone size={28} />, count: "Flagship & AI phones", color: "from-blue-600 to-indigo-600" },
    { name: "Laptops", icon: <Laptop size={28} />, count: "Ultrabooks & Creators", color: "from-violet-600 to-purple-600" },
    { name: "Audio", icon: <Headphones size={28} />, count: "Spatial & Hi-Res NC", color: "from-cyan-600 to-blue-600" },
    { name: "Wearables", icon: <Watch size={28} />, count: "Health & GPS watches", color: "from-teal-600 to-emerald-600" },
    { name: "Gaming", icon: <Gamepad2 size={28} />, count: "Consoles & Peripherals", color: "from-rose-600 to-orange-600" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} className="animate-pulse" />
            <span>New Generation Gadgets 2026</span>
          </div>
          <h1 className="hero-title">
            Engineered for <span className="text-gradient">Performance</span>. Designed for the Future.
          </h1>
          <p className="hero-description">
            Discover cutting-edge smartphones, ultra-fast silicon laptops, spatial audio gear, and elite gaming hardware — all backed by official warranties.
          </p>
          <div className="hero-cta-group">
            <Link to="/products" className="btn-hero-primary">
              <span>Browse All Products</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/wishlist" className="btn-hero-secondary">
              View Wishlist
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-glow"></div>
          <img
            src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1000&q=80"
            alt="Flagship Tech"
            className="hero-image"
          />
        </div>
      </section>

      {/* Value Badges */}
      <section className="perks-grid">
        <div className="perk-card">
          <Truck className="perk-icon" size={26} />
          <div>
            <h4>Free Express Shipping</h4>
            <p>On orders above ₹4,999</p>
          </div>
        </div>
        <div className="perk-card">
          <ShieldCheck className="perk-icon" size={26} />
          <div>
            <h4>100% Genuine Brands</h4>
            <p>Direct manufacturer warranty</p>
          </div>
        </div>
        <div className="perk-card">
          <RefreshCw className="perk-icon" size={26} />
          <div>
            <h4>7-Day Easy Returns</h4>
            <p>Instant replacement guaranteed</p>
          </div>
        </div>
        <div className="perk-card">
          <Headset className="perk-icon" size={26} />
          <div>
            <h4>24/7 Tech Support</h4>
            <p>Expert hardware specialists</p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop By Category</h2>
            <p className="section-subtitle">Find the exact hardware to elevate your productivity</p>
          </div>
          <Link to="/products" className="section-link">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-showcase-grid">
          {categoryHighlights.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category-showcase-card"
            >
              <div className="category-icon-bubble">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Trending Tech Products</h2>
            <p className="section-subtitle">Top-rated bestsellers loved by tech enthusiasts</p>
          </div>
          <Link to="/products" className="section-link">
            <span>See Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
              onToast={onToast}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
