import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  CheckCircle2, 
  Share2,
  PackageCheck
} from "lucide-react";
import api, { defaultProducts } from "../services/api";
import { addWishlist, removeWishlist } from "../features/wishlistSlice";

export default function ProductDetails({ onDeleteProduct, onToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);
  const favorited = wishlist.some((item) => String(item.id) === String(id));

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.warn("Could not fetch from json-server, checking default products", err);
      const matched = defaultProducts.find((p) => String(p.id) === String(id));
      if (matched) {
        setProduct(matched);
      } else {
        setError("Electronic product not found or server is unreachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (favorited) {
      dispatch(removeWishlist(product.id));
      if (onToast) onToast(`Removed "${product.name}" from wishlist.`, "info");
    } else {
      dispatch(addWishlist(product));
      if (onToast) onToast(`Added "${product.name}" to wishlist!`, "success");
    }
  };

  const handleDelete = () => {
    if (!product) return;
    if (window.confirm(`Are you sure you want to permanently delete "${product.name}"?`)) {
      if (onDeleteProduct) {
        onDeleteProduct(product.id);
        navigate("/products");
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (onToast) onToast("Product link copied to clipboard!", "success");
    }
  };

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Loading specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="details-error-card">
        <h2>Product Not Found</h2>
        <p>{error || "The requested gadget could not be located."}</p>
        <Link to="/products" className="btn-back-catalog">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="product-details-container">
      {/* Breadcrumbs Navigation */}
      <nav className="details-breadcrumbs">
        <Link to="/">Home</Link>
        <span className="crumb-separator">/</span>
        <Link to="/products">Products</Link>
        <span className="crumb-separator">/</span>
        <span className="crumb-current">{product.name}</span>
      </nav>

      {/* Main 2-Column Product Layout */}
      <div className="details-main-grid">
        {/* Left Column: Product Image Gallery */}
        <div className="details-gallery-box">
          <div className="details-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="details-hero-image"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80";
              }}
            />
            <span className="details-badge-cat">{product.category}</span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="details-info-box">
          <div className="details-meta-top">
            <span className="details-brand">{product.brand}</span>
            <div className="details-rating-chip">
              <Star size={16} fill="#eab308" color="#eab308" />
              <span>{product.rating}</span>
              <span className="rating-count">(Verified Specs)</span>
            </div>
          </div>

          <h1 className="details-title">{product.name}</h1>

          <div className="details-price-row">
            <span className="details-price">{formattedPrice}</span>
            <span className={`details-stock-chip ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
              <PackageCheck size={16} />
              <span>{product.stock > 0 ? `In Stock (${product.stock} units)` : "Currently Unavailable"}</span>
            </span>
          </div>

          <p className="details-description">{product.description}</p>

          {/* Action Row */}
          <div className="details-actions-bar">
            <button
              type="button"
              onClick={handleWishlistToggle}
              className={`btn-details-wishlist ${favorited ? "favorited" : ""}`}
            >
              <Heart size={20} fill={favorited ? "#f43f5e" : "transparent"} color={favorited ? "#f43f5e" : "#cbd5e1"} />
              <span>{favorited ? "Saved in Wishlist" : "Add to Wishlist"}</span>
            </button>

            <Link
              to={`/edit-product/${product.id}`}
              className="btn-details-edit"
              title="Edit this product"
            >
              <Edit3 size={18} />
              <span>Edit Product</span>
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="btn-details-delete"
              title="Delete this product"
            >
              <Trash2 size={18} />
              <span>Delete</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="btn-details-share"
              title="Share product link"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Key Hardware Specs */}
          {product.features && product.features.length > 0 && (
            <div className="details-specs-card">
              <div className="specs-header">
                <Cpu size={18} className="specs-icon" />
                <h3>Technical Specifications</h3>
              </div>
              <ul className="specs-list">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="spec-item">
                    <CheckCircle2 size={16} className="spec-check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warranty & Guarantee Perks */}
          <div className="details-perks-row">
            <div className="details-perk">
              <ShieldCheck size={20} className="text-cyan" />
              <div>
                <strong>Warranty</strong>
                <p>{product.warranty || "1 Year Official Brand Warranty"}</p>
              </div>
            </div>

            <div className="details-perk">
              <Truck size={20} className="text-indigo" />
              <div>
                <strong>Express Delivery</strong>
                <p>Ships within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
