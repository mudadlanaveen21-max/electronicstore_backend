import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/Toast";
import api, { defaultProducts } from "./services/api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toast Notification State
  const [toast, setToast] = useState({ message: "", type: "info" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Fetch all products from json-server with fallback
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      if (Array.isArray(response.data) && response.data.length > 0) {
        setProducts(response.data);
      } else {
        setProducts(defaultProducts);
      }
    } catch (error) {
      console.warn("Could not reach JSON Server. Serving default electronic products catalog.", error);
      setProducts(defaultProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler when product is created via /add-product
  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Handler when product is updated via /edit-product/:id
  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (String(p.id) === String(updatedProduct.id) ? updatedProduct : p))
    );
  };

  // DELETE operation
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to permanently delete this product?")) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(productId)));
      showToast("Product deleted successfully.", "info");
    } catch (err) {
      console.warn("Failed API DELETE, removing from state locally", err);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(productId)));
      showToast("Product deleted from view.", "info");
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-viewport">
        <AppRoutes
          products={products}
          loading={loading}
          onDeleteProduct={handleDeleteProduct}
          onProductAdded={handleProductAdded}
          onProductUpdated={handleProductUpdated}
          onToast={showToast}
        />
      </main>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      <footer className="app-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} ElectroHub Store. Built with Vite, React 19, Redux Toolkit, React Router, Axios, and JSON Server.</p>
          <div className="footer-links">
            <span>Enterprise Hardware</span>
            <span>•</span>
            <span>Fast Logistics</span>
            <span>•</span>
            <span>2-Year Warranty</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
