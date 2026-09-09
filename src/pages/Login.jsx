import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login({ onToast }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (onToast) onToast(`Welcome back, ${result.user.name}!`, "success");
      const from = location.state?.from?.pathname || "/products";
      navigate(from, { replace: true });
    } else {
      setErrorMsg(result.message || "Failed to sign in. Please verify credentials.");
    }
  };

  const handleFillDemo = () => {
    setEmail("alex@electro.com");
    setPassword("password123");
    setErrorMsg("");
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrap">
            <LogIn size={26} className="text-cyan" />
          </div>
          <h2>Sign In to ElectroHub</h2>
          <p>Access your orders, saved wishlist items, and manage inventory</p>
        </div>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email Address</label>
            <div className="auth-input-group">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Quick 1-click Demo Fill */}
          <button
            type="button"
            onClick={handleFillDemo}
            className="btn-demo-fill"
          >
            <Sparkles size={14} />
            <span>Use Demo Account (alex@electro.com)</span>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="btn-auth-submit"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer-prompt">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
