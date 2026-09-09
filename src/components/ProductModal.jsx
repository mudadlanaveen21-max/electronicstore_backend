import { useState, useEffect } from "react";
import { X, Plus, Save, Image, Sparkles } from "lucide-react";

export default function ProductModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Smartphones",
    price: "",
    rating: 4.8,
    stock: 10,
    image: "",
    description: "",
    warranty: "1 Year Official Brand Warranty",
    featuresText: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        brand: initialData.brand || "",
        category: initialData.category || "Smartphones",
        price: initialData.price || "",
        rating: initialData.rating || 4.8,
        stock: initialData.stock !== undefined ? initialData.stock : 10,
        image: initialData.image || "",
        description: initialData.description || "",
        warranty: initialData.warranty || "1 Year Official Brand Warranty",
        featuresText: Array.isArray(initialData.features) ? initialData.features.join("\n") : ""
      });
    } else {
      setFormData({
        name: "",
        brand: "",
        category: "Smartphones",
        price: "",
        rating: 4.8,
        stock: 10,
        image: "",
        description: "",
        warranty: "1 Year Official Brand Warranty",
        featuresText: ""
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Product name is required";
    if (!formData.brand.trim()) errs.brand = "Brand is required";
    if (!formData.price || Number(formData.price) <= 0) errs.price = "Enter a valid positive price";
    if (!formData.image.trim()) errs.image = "Image URL is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse features by lines
    const parsedFeatures = formData.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const productPayload = {
      ...(initialData || {}),
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      price: Number(formData.price),
      rating: Number(formData.rating) || 4.5,
      stock: Number(formData.stock) || 0,
      image: formData.image.trim(),
      description: formData.description.trim(),
      warranty: formData.warranty.trim(),
      features: parsedFeatures.length > 0 ? parsedFeatures : ["High-performance electronics hardware", "Premium build quality"]
    };

    onSubmit(productPayload);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Sparkles size={20} className="modal-icon text-cyan" />
            <h2>{isEditing ? "Edit Product Details" : "Add New Electronic Product"}</h2>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid-2">
            {/* Product Name */}
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                placeholder="e.g. Apple iPhone 16 Pro Max"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Brand */}
            <div className="form-group">
              <label>Brand *</label>
              <input
                type="text"
                placeholder="e.g. Apple, Sony, Samsung, Dell"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className={errors.brand ? "input-error" : ""}
              />
              {errors.brand && <span className="field-error">{errors.brand}</span>}
            </div>
          </div>

          <div className="form-grid-3">
            {/* Category */}
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio">Audio</option>
                <option value="Wearables">Wearables</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                placeholder="e.g. 89900"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <span className="field-error">{errors.price}</span>}
            </div>

            {/* Stock */}
            <div className="form-group">
              <label>Stock Count</label>
              <input
                type="number"
                min="0"
                placeholder="10"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            {/* Rating */}
            <div className="form-group">
              <label>Rating (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="4.8"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>

            {/* Warranty */}
            <div className="form-group">
              <label>Warranty Terms</label>
              <input
                type="text"
                placeholder="e.g. 1 Year Official Brand Warranty"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={errors.image ? "input-error" : ""}
            />
            {errors.image && <span className="field-error">{errors.image}</span>}
            {formData.image && (
              <div className="image-preview-chip">
                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                <span>Image Preview</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              rows="3"
              placeholder="Provide a detailed description of features, materials, and capabilities..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          {/* Features (One per line) */}
          <div className="form-group">
            <label>Key Specifications / Features (one per line)</label>
            <textarea
              rows="3"
              placeholder="A18 Pro chip with 6-core GPU&#10;6.9-inch Super Retina XDR OLED display&#10;Titanium body design"
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
            />
          </div>

          <div className="modal-actions-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit-modal">
              {isEditing ? <Save size={18} /> : <Plus size={18} />}
              <span>{isEditing ? "Save Changes" : "Create Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
