import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Table {
  id_table: number;
  number: number;
  quantity: number;
}

interface TableState {
  table: Table[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null | undefined;
}

const initialState: TableState = {
  table: [],
  status: "idle",
  error: null,
};

export const fetchTables = createAsyncThunk("table/fetchTables", async () => {
  try {
    const res = await fetch("https://zavrsni-server.vercel.app/api/tables", {
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
    throw error;
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
