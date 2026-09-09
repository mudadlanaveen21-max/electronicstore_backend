import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout({ onToast }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("electro_user");
    logout();
    if (onToast) onToast("You have successfully signed out.", "info");
    navigate("/login");
  }, [logout, navigate, onToast]);

  return (
    <div className="form-page-wrapper">
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Signing you out securely...</p>
      </div>
    </div>
  );
}
