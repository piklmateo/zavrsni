import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PopularTimeSlot {
  time: string;
  reservation_count: string;
}

export interface PopularDish {
  dish_name: string;
  total_quantity: string;
}

export interface PopularDrink {
  drink_name: string;
  total_quantity: string;
}

interface StatisticsState {
  popularTimeSlots: PopularTimeSlot[];
  popularDishes: PopularDish[];
  popularDrinks: PopularDrink[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StatisticsState = {
  popularTimeSlots: [],
  popularDishes: [],
  popularDrinks: [],
  status: "idle",
  error: null,
};

export const fetchPopularTimeSlots = createAsyncThunk("statistics/fetchPopularTimeSlots", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("You don't have a valid token");
    }
    const res = await fetch("https://zavrsni-server.vercel.app/api/statistics/popular/timeSlots", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data...");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

export const fetchPopularDishes = createAsyncThunk("statistics/fetchPopularDishes", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("You don't have a valid token");
    }
    const res = await fetch("https://zavrsni-server.vercel.app/api/statistics/popular/dishes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data...");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

export const fetchPopularDrinks = createAsyncThunk("statistics/fetchPopularDrinks", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("You don't have a valid token");
    }
    const res = await fetch("https://zavrsni-server.vercel.app/api/statistics/popular/drinks", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data...");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularTimeSlots.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularTimeSlots.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularTimeSlots = action.payload;
      })
      .addCase(fetchPopularTimeSlots.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPopularDishes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularDishes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularDishes = action.payload;
      })
      .addCase(fetchPopularDishes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPopularDrinks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularDrinks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularDrinks = action.payload;
      })
      .addCase(fetchPopularDrinks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default statisticsSlice.reducer;
