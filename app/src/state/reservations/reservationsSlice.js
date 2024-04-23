import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  reservations: [],
  status: "idle",
  error: null,
};

export const fetchReservations = createAsyncThunk("reservations/fetchReservations", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
      return []; // Return empty array or null, depending on your application's logic
    }

    const res = await fetch("http://localhost:12413/api/reservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch reservations");
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reservationsSlice.reducer;

// Action creators
// export const {} = reservationsSlice.actions;
