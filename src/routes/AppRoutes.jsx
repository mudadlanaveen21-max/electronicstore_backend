import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes({
  products,
  loading,
  onDeleteProduct,
  onProductAdded,
  onProductUpdated,
  onToast,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            featuredProducts={products}
            onDeleteProduct={onDeleteProduct}
            onToast={onToast}
          />
        }
      />
      <Route
        path="/products"
        element={
          <Products
            products={products}
            loading={loading}
            onDeleteProduct={onDeleteProduct}
            onToast={onToast}
          />
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProductDetails
            onDeleteProduct={onDeleteProduct}
            onToast={onToast}
          />
        }
      />
      
      {/* Day 2 & Day 3 Protected CRUD Routes */}
      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct
              onToast={onToast}
              onProductAdded={onProductAdded}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute>
            <EditProduct
              onToast={onToast}
              onProductUpdated={onProductUpdated}
            />
          </ProtectedRoute>
        }
      />

      {/* Wishlist & Auth Routes */}
      <Route path="/wishlist" element={<Wishlist onToast={onToast} />} />
      <Route path="/register" element={<Register onToast={onToast} />} />
      <Route path="/signup" element={<Register onToast={onToast} />} />
      <Route path="/login" element={<Login onToast={onToast} />} />
      <Route path="/logout" element={<Logout onToast={onToast} />} />
    </Routes>
  );
}
