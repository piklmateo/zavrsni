import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.find(
        (item) => item.id === newItem.id_dish || item.id === newItem.id_drink
      );
      const price = parseFloat(newItem.price);
      if (existingItem) {
        return state.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: price * (item.quantity + 1),
              }
            : item
        );
      } else {
        return [...state, { ...newItem, quantity: 1, totalPrice: price }];
      }
    },

    removeItem(state, action) {
      const itemToRemove = action.payload;
      const existingItem = state.find(
        (item) =>
          item.id === itemToRemove.id_dish || item.id === itemToRemove.id_drink
      );
      const price = parseFloat(itemToRemove.price);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return state.filter((item) => item.id !== existingItem.id);
        } else {
          return state.map((item) =>
            item.id === existingItem.id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: price * (item.quantity - 1),
                }
              : item
          );
        }
      }
      return state;
    },
    clear() {
      // Simply return an empty array to clear the state
      return [];
    },
  },
});

export const { addItem, removeItem, clear } = orderSlice.actions;
export default orderSlice.reducer;
