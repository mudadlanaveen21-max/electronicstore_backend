import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { removeWishlist, clearWishlist } from "../features/wishlistSlice";

export default function Wishlist({ onToast }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const handleRemove = (productId, productName) => {
    dispatch(removeWishlist(productId));
    if (onToast) {
      onToast(`Removed "${productName}" from wishlist`, "info");
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
      if (onToast) {
        onToast("Cleared all items from wishlist", "info");
      }
    }
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header-row">
        <div>
          <div className="wishlist-badge">
            <Heart size={16} className="text-rose-500 fill-current" />
            <span>Saved Gadgets</span>
          </div>
          <h1 className="page-heading">My Wishlist</h1>
          <p className="page-subheading">
            Review and organize the electronics you are planning to buy
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="btn-clear-wishlist"
            title="Clear all wishlist items"
          >
            <Trash2 size={16} />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty-card">
          <div className="empty-heart-ring">
            <Heart size={48} className="empty-heart-icon" />
          </div>
          <h2>No Favorite Electronics</h2>
          <p>Add electronic products to your favorites from the Products catalog.</p>
          <Link to="/products" className="btn-browse-products">
            <Sparkles size={18} />
            <span>Explore Electronics</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => {
            const formattedPrice = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(item.price);

            return (
              <div key={item.id} className="wishlist-item-card">
                <div className="wishlist-media">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80";
                    }}
                  />
                  <span className="wishlist-cat-tag">{item.category}</span>
                </div>

                <div className="wishlist-details">
                  <span className="wishlist-brand">{item.brand}</span>
                  <h3 className="wishlist-name">
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </h3>
                  <div className="wishlist-price-stack">
                    <span className="wishlist-price">{formattedPrice}</span>
                  </div>

                  <div className="wishlist-actions">
                    <Link to={`/products/${item.id}`} className="btn-wishlist-view">
                      <span>View</span>
                      <ArrowRight size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id, item.name)}
                      className="btn-wishlist-remove"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
