import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Zap, 
  Search, 
  Heart, 
  PlusCircle, 
  LogOut, 
  Menu, 
  X,
  User
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const wishlist = useSelector((state) => state.wishlist);
  const wishlistCount = wishlist ? wishlist.length : 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon-wrapper">
            <Zap className="logo-icon" size={22} />
          </div>
          <span className="brand-name">
            Electro<span className="brand-accent">Hub</span>
          </span>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <Search className="search-input-icon" size={18} />
          <input
            type="text"
            placeholder="Search laptops, smartphones, audio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
          />
        </form>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/products" className={`nav-link ${isActive("/products") ? "active" : ""}`}>
            Products
          </Link>

          {/* Redux Wishlist link with automatic count */}
          <Link to="/wishlist" className={`nav-link wishlist-link ${isActive("/wishlist") ? "active" : ""}`}>
            <Heart size={18} className={wishlistCount > 0 ? "fill-current text-rose-500" : ""} />
            <span>Wishlist ({wishlistCount})</span>
          </Link>

          {/* Day 3 Auth Links & Protected Actions */}
          {isAuthenticated || localStorage.getItem("user") ? (
            <>
              <Link to="/add-product" className="add-btn" style={{ margin: 0, padding: "8px 16px" }}>
                <PlusCircle size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
                Add Product
              </Link>
              <div className="user-profile-menu">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"}
                  alt={user?.name || "User"}
                  className="user-avatar"
                />
                <span className="user-name">{user?.name ? user.name.split(" ")[0] : "User"}</span>
                <Link to="/logout" className="btn-logout" title="Sign Out">
                  <LogOut size={16} />
                </Link>
              </div>
            </>
          ) : (
            <div className="auth-buttons-group">
              <Link to="/register" className="btn-signup">
                Register
              </Link>
              <Link to="/login" className="btn-login">
                Login
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="mobile-wishlist-row">
            <span>Wishlist</span>
            <span className="badge-count">{wishlistCount}</span>
          </Link>

          {isAuthenticated || localStorage.getItem("user") ? (
            <>
              <Link to="/add-product" onClick={() => setMobileMenuOpen(false)} className="mobile-btn-add">
                <PlusCircle size={18} /> Add New Product
              </Link>
              <hr className="mobile-divider" />
              <Link to="/logout" onClick={() => setMobileMenuOpen(false)} className="btn-logout-mobile">
                <LogOut size={16} /> Logout
              </Link>
            </>
          ) : (
            <div className="mobile-auth-actions">
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-signup w-full text-center">
                Register
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-login w-full text-center">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
