// store.js
import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "../slices/reservations/reservationsSlice.js";
import categoryReducer from "../slices/category/categorySlice.js";
import userReducer from "../slices/user/userSlice.js";
import dishReducer from "../slices/dish/dishSlice.js";
import drinkReducer from "../slices/drink/drinkSlice.js";
import orderReducer from "../slices/order/orderSlice.js";
import orderListReducer from "../slices/order/orderListSlice.js";
import tableReducer from "../slices/table/tableSlice.js";
// import reservationsUserReducer from "../slices/reservationsUser/reservationsUserSlice.js";

const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    // reservationsUser: reservationsUserReducer,
    category: categoryReducer,
    user: userReducer,
    dish: dishReducer,
    drink: drinkReducer,
    order: orderReducer,
    orderList: orderListReducer,
    table: tableReducer,
  },
});

export default store;
