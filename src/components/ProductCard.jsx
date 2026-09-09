import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Star, Edit3, Trash2, ArrowRight } from "lucide-react";
import { addWishlist, removeWishlist } from "../features/wishlistSlice";

export default function ProductCard({ product, onDelete, onToast }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const favorited = wishlist.some((item) => String(item.id) === String(product.id));

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      dispatch(removeWishlist(product.id));
      if (onToast) onToast(`Removed "${product.name}" from wishlist`, "info");
    } else {
      dispatch(addWishlist(product));
      if (onToast) onToast(`Added "${product.name}" to wishlist!`, "success");
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="product-card">
      <div className="card-media-wrapper">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-image"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80";
          }}
        />

        <span className="card-category-badge">{product.category}</span>

        <button
          type="button"
          onClick={handleFavorite}
          className={`btn-wishlist-toggle ${favorited ? "active" : ""}`}
          title={favorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist toggle"
        >
          <Heart size={18} fill={favorited ? "#f43f5e" : "transparent"} color={favorited ? "#f43f5e" : "#ffffff"} />
        </button>
      </div>

      <div className="card-content">
        <div className="card-meta-row">
          <span className="card-brand">{product.brand}</span>
          <div className="card-rating">
            <Star size={14} className="star-icon" fill="#eab308" color="#eab308" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="product-title" title={product.name}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="product-desc-snippet">
          {product.description && product.description.length > 75
            ? product.description.slice(0, 75) + "..."
            : product.description}
        </p>

        <div className="card-pricing-row">
          <div className="price-stack">
            <span className="price-label">Price</span>
            <span className="product-price">{formattedPrice}</span>
          </div>

          <span className={`stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.stock > 0 ? `In Stock (${product.stock})` : "Sold Out"}
          </span>
        </div>

        {/* Day 2 Action Buttons Layout: View, Edit, Delete */}
        <div className="card-actions">
          <Link className="view-btn" to={`/products/${product.id}`}>
            View
          </Link>
          <Link className="edit-btn" to={`/edit-product/${product.id}`}>
            Edit
          </Link>
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete && onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
