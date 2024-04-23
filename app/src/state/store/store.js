// store.js
import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "../reservations/reservationsSlice.js";
import categorySlice from "../category/categorySlice.js";

const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    category: categorySlice,
  },
});

export default store;
