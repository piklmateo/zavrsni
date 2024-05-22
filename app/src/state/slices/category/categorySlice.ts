import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Category {
  id_category: number;
  name: string;
}

interface CategoryState {
  category: Category[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null | undefined;
}

const initialState: CategoryState = {
  category: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
  try {
    const res = await fetch("https://zavrsni-server.vercel.app/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeded";
        state.category = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
