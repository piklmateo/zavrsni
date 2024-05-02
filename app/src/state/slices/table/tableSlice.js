import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  table: [],
  status: "idle",
  error: null,
};

export const fetchTables = createAsyncThunk("table/fetchTables", async () => {
  try {
    const res = await fetch("http://localhost:12413/api/tables", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("error fetching table data...");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
});

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.table = action.payload;
        state.status = "succeded";
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tableSlice.reducer;
