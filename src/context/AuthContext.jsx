import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("electro_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("electro_user", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("electro_user");
      localStorage.removeItem("user");
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.get(`/users?email=${encodeURIComponent(email)}`);
      const matched = response.data.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matched) {
        const sessionUser = {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          role: matched.role || "Customer",
          avatar: matched.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
        };
        setUser(sessionUser);
        return { success: true, user: sessionUser };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      console.warn("API login failed, checking offline fallback", error);
      // Fallback for offline/demo if json-server isn't running
      if (email === "alex@electro.com" && password === "password123") {
        const demoUser = {
          id: "1",
          name: "Alex Tech",
          email: "alex@electro.com",
          role: "Admin",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
        };
        setUser(demoUser);
        return { success: true, user: demoUser };
      }
      return { success: false, message: "Could not reach server. Use demo: alex@electro.com / password123" };
    }
  };

  // Signup function
  const signup = async ({ name, email, password }) => {
    try {
      // Check if user already exists
      const existing = await api.get(`/users?email=${encodeURIComponent(email)}`);
      if (existing.data && existing.data.length > 0) {
        return { success: false, message: "An account with this email already exists" };
      }

      const newUser = {
        name,
        email,
        password,
        role: "Customer",
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
      };

      const res = await api.post("/users", newUser);
      const createdUser = {
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        avatar: res.data.avatar
      };
      setUser(createdUser);
      return { success: true, user: createdUser };
    } catch (error) {
      console.warn("API signup error, using local fallback", error);
      const fallbackUser = {
        id: Date.now().toString(),
        name,
        email,
        role: "Customer",
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
      };
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
