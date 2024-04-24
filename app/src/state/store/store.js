// store.js
import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "../slices/reservations/reservationsSlice.js";
import categorySlice from "../slices/category/categorySlice.js";
import userSlice from "../slices/user/userSlice.js";

const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    category: categorySlice,
    user: userSlice,
  },
});

export default store;
