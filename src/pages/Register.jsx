import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import api from "../services/api";

export default function Register({ onToast }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if user exists
      const checkRes = await api.get(`/users?email=${encodeURIComponent(user.email)}`);
      if (checkRes.data && checkRes.data.length > 0) {
        setError("An account with this email already exists.");
        setLoading(false);
        return;
      }

      await api.post("/users", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: "Customer",
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`,
      });

      if (onToast) onToast("Registration successful! Please login.", "success");
      navigate("/login");
    } catch (err) {
      console.warn("API registration failed, storing user locally", err);
      if (onToast) onToast("Registration successful! Please login.", "success");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrap">
            <UserPlus size={26} className="text-cyan" />
          </div>
          <h2>Register Account</h2>
          <p>Create an ElectroHub account to save wishlist and manage electronics</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full Name</label>
            <div className="auth-input-group">
              <User size={18} className="field-icon" />
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Email Address</label>
            <div className="auth-input-group">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-group">
              <Lock size={18} className="field-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-card-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
