import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orderList/fetchOrders",
  async () => {
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
    }
  }
);

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
