# ⚡ ElectroHub - Electronics Store

A full-featured, responsive Electronics Store single-page web application built with **Vite, React 19, React Router, Axios, and JSON Server**.

## 🚀 Features
- **User Authentication**: Login, Signup, Logout, persistent session with `localStorage` & `AuthContext`.
- **Product CRUD**:
  - **Create**: Add new electronic gadgets with dynamic specifications, image preview, pricing, and stock.
  - **Read**: Interactive catalog grid and in-depth product detail page (`/products/:id`).
  - **Update**: Edit existing product details via modal dialog with auto-prefill.
  - **Delete**: Instant product removal with confirmation dialog.
- **Live Search**: Instant keyword search by title, brand, category, and specifications.
- **Multi-Criteria Filter & Sort**: Filter by category, price slider, minimum rating, and stock status; sort by price and rating.
- **Wishlist Management**: Real-time heart toggle on cards/details, badge counter in navbar, and dedicated `/wishlist` page.
- **Futuristic Dark Theme**: Responsive glassmorphism cards, glowing badges, mobile drawer menu, and toast notifications.

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Run both JSON Server (port 3000) and Vite frontend concurrently
npm run dev:all
```

* Frontend: `http://localhost:5173`
* JSON Server Backend: `http://localhost:3000/products`

### Demo Credentials:
- **Email**: `alex@electro.com`
- **Password**: `password123`
