import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  dish: [],
  status: "idle",
  error: null,
};

export const fetchDishes = createAsyncThunk("dish/fetchDishData", async () => {
  try {
    const res = await fetch("http://localhost:12413/api/dishes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dishes");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = "succeded";
        state.dish = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dishSlice.reducer;
