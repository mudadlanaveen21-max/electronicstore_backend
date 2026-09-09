import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit3, ArrowLeft, Image, Save } from "lucide-react";
import api, { defaultProducts } from "../services/api";

export default function EditProduct({ onToast, onProductUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Smartphones",
    price: "",
    rating: "4.8",
    stock: "10",
    image: "",
    description: "",
    warranty: "1 Year Official Brand Warranty",
    featuresText: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProduct();
  }, [id]);

  async function getProduct() {
    setLoading(true);
    try {
      const response = await api.get(`/products/${id}`);
      const data = response.data;
      setFormData({
        name: data.name || "",
        brand: data.brand || "",
        category: data.category || "Smartphones",
        price: data.price || "",
        rating: data.rating || "4.8",
        stock: data.stock !== undefined ? data.stock : "10",
        image: data.image || "",
        description: data.description || "",
        warranty: data.warranty || "1 Year Official Brand Warranty",
        featuresText: Array.isArray(data.features) ? data.features.join("\n") : "",
      });
    } catch (err) {
      console.warn("Could not fetch product from API, checking default products", err);
      const matched = defaultProducts.find((p) => String(p.id) === String(id));
      if (matched) {
        setFormData({
          name: matched.name || "",
          brand: matched.brand || "",
          category: matched.category || "Smartphones",
          price: matched.price || "",
          rating: matched.rating || "4.8",
          stock: matched.stock !== undefined ? matched.stock : "10",
          image: matched.image || "",
          description: matched.description || "",
          warranty: matched.warranty || "1 Year Official Brand Warranty",
          featuresText: Array.isArray(matched.features) ? matched.features.join("\n") : "",
        });
      } else {
        setError("Electronic product not found.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.price) {
      setError("Name, Brand, and Price are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    const parsedFeatures = formData.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedProduct = {
      id,
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      price: Number(formData.price),
      rating: Number(formData.rating) || 4.5,
      stock: Number(formData.stock) || 0,
      image: formData.image.trim(),
      description: formData.description.trim(),
      warranty: formData.warranty.trim(),
      features: parsedFeatures.length > 0 ? parsedFeatures : ["Premium electronics hardware"],
    };

    try {
      const res = await api.put(`/products/${id}`, updatedProduct);
      if (onProductUpdated) onProductUpdated(res.data);
      if (onToast) onToast(`Product "${updatedProduct.name}" updated successfully!`, "success");
      navigate("/products");
    } catch (err) {
      console.warn("API put error, saving locally", err);
      if (onProductUpdated) onProductUpdated(updatedProduct);
      if (onToast) onToast(`Product "${updatedProduct.name}" updated!`, "success");
      navigate("/products");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="form-page-wrapper">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page-wrapper">
      <div className="form-header-bar">
        <Link to="/products" className="btn-back-link">
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="form-container">
        <div className="form-title-wrap">
          <div className="form-icon-bubble">
            <Edit3 size={26} className="text-cyan" />
          </div>
          <h2>Edit Product</h2>
          <p>Update specifications, stock, and pricing for this item</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-grid-2">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio">Audio</option>
                <option value="Wearables">Wearables</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock Count</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Rating (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Warranty</label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
            {formData.image && (
              <div className="image-preview-chip">
                <img src={formData.image} alt="Preview" onError={(e) => (e.target.style.display = "none")} />
                <span>Image Preview</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Technical Specifications (one per line)</label>
            <textarea
              name="featuresText"
              value={formData.featuresText}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
