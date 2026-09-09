import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlistSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});
