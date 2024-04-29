// store.js
import { configureStore } from "@reduxjs/toolkit";
import reservationsSlice from "../slices/reservations/reservationsSlice.js";
import categorySlice from "../slices/category/categorySlice.js";
import userSlice from "../slices/user/userSlice.js";
import dishSlice from "../slices/dish/dishSlice.js";
import drinkSlice from "../slices/drink/drinkSlice.js";
import orderSlice from "../slices/order/orderSlice.js";
import orderListSlice from "../slices/order/orderListSlice.js";

const store = configureStore({
  reducer: {
    reservations: reservationsSlice,
    category: categorySlice,
    user: userSlice,
    dish: dishSlice,
    drink: drinkSlice,
    order: orderSlice,
    orderList: orderListSlice,
  },
});

export default store;
