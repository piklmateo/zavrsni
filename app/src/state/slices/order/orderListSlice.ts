import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface OrderList {
  id_order: number;
  date: string;
  status: string;
  dish_id: number;
  dish_name: string;
  dish_quantity: number;
  drink_id: number;
  drink_name: string;
  drink_quantity: number;
}

interface OrderListState {
  orderList: OrderList[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null | undefined;
}

const initialState: OrderListState = {
  orderList: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("orderList/fetchOrders", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
    }

    const res = await fetch("http://localhost:12413/api/orders", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      console.log("error fetching orders...");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeded";
        state.orderList = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderListSlice.reducer;
