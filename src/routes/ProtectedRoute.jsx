import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Also check localStorage directly for maximum reliability
  const localUser = JSON.parse(
    localStorage.getItem("user") || localStorage.getItem("electro_user") || "null"
  );

  if (!isAuthenticated && !localUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
