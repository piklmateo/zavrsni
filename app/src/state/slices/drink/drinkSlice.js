import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  drink: [],
  status: "idle",
  error: null,
};

export const fetchDrinks = createAsyncThunk("drink/fetchDrinkData", async () => {
  try {
    const res = await fetch("http://localhost:12413/api/drinks", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Unable to fetch drinks...");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
});

const drinkSlice = createSlice({
  name: "drink",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.status = "succeded";
        state.drink = action.payload;
      })
      .addCase(fetchDrinks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default drinkSlice.reducer;
