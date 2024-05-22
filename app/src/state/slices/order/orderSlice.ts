import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dish {
  id_dish: number;
  name: string;
  ingridients: string;
  price: number;
  category_id: number;
  category_name: string;
  quantity: number;
  totalPrice?: number;
}

export interface Drink {
  id_drink: number;
  name: string;
  price: number;
  category_id: number;
  category_name: string;
  quantity: number;
  totalPrice?: number;
}

export type OrderItem = Dish | Drink;

type OrderState = OrderItem[];
const initialState: OrderState = [];

function isDish(item: OrderItem): item is Dish {
  return (item as Dish).id_dish !== undefined;
}

function isDrink(item: OrderItem): item is Drink {
  return (item as Drink).id_drink !== undefined;
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<OrderItem>) {
      const newItem = action.payload;

      const existingIndex = state.findIndex((item) =>
        isDish(newItem) && isDish(item) ? item.id_dish === newItem.id_dish : isDrink(newItem) && isDrink(item) ? item.id_drink === newItem.id_drink : false
      );

      const price = parseFloat(newItem.price.toString());

      if (existingIndex !== -1) {
        return state.map((item, index) =>
          index === existingIndex
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

    removeItem(state, action: PayloadAction<OrderItem>) {
      const itemToRemove = action.payload;
      const existingIndex = state.findIndex(
        (item) => (item as Dish).id_dish === (itemToRemove as Dish).id_dish || (item as Drink).id_drink === (itemToRemove as Drink).id_drink
      );

      if (existingIndex !== -1) {
        const existingItem = state[existingIndex];
        const price = parseFloat((itemToRemove as Dish | Drink).price.toString());
        const updatedQuantity = existingItem.quantity - 1;

        if (updatedQuantity === 0) {
          return state.filter((item, index) => index !== existingIndex);
        } else {
          return state.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: updatedQuantity,
                  totalPrice: price * updatedQuantity,
                }
              : item
          );
        }
      }

      return state;
    },

    clear() {
      return [];
    },
  },
});

export const { addItem, removeItem, clear } = orderSlice.actions;
export default orderSlice.reducer;
