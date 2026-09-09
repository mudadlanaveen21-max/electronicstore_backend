import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Failed to load wishlist from storage", e);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlistFromStorage(),
  reducers: {
    addWishlist: (state, action) => {
      const exists = state.find(
        (product) => String(product.id) === String(action.payload.id)
      );
      if (!exists) {
        state.push(action.payload);
        try {
          localStorage.setItem("wishlist", JSON.stringify(state));
        } catch (e) {
          console.error("Failed to save wishlist", e);
        }
      }
    },
    removeWishlist: (state, action) => {
      const updated = state.filter(
        (product) => String(product.id) !== String(action.payload)
      );
      try {
        localStorage.setItem("wishlist", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save wishlist", e);
      }
      return updated;
    },
    clearWishlist: () => {
      try {
        localStorage.removeItem("wishlist");
      } catch (e) {
        console.error("Failed to clear wishlist", e);
      }
      return [];
    },
  },
});

export const { addWishlist, removeWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
