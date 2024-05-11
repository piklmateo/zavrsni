import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  reservations: [],
  specialReservations: [],
  userReservations: [],
  userSpecialReservations: [],
  status: "idle",
  error: null,
};

export const fetchReservations = createAsyncThunk("reservations/fetchReservations", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
      return [];
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

export const fetchReservationsWholeDay = createAsyncThunk("reservations/fetchReservationsWholeDay", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
      return [];
    }

    const res = await fetch("http://localhost:12413/api/reservations/special", {
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

export const fetchUserReservations = createAsyncThunk("reservationsUser/fetchUserReservations", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
      return [];
    }
    const decodedToken = jwtDecode(token);
    const id_user = decodedToken.user.id_user;

    const res = await fetch("http://localhost:12413/api/users/reservations/" + id_user, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      console.log("Unable to fetch user reservations");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

export const fetchSpecialUserReservations = createAsyncThunk(
  "reservationsUser/fetchSpecialUserReservations",
  async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("You don't have a valid token");
        return [];
      }
      const decodedToken = jwtDecode(token);
      const id_user = decodedToken.user.id_user;

      const res = await fetch("http://localhost:12413/api/users/reservations/special/" + id_user, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        console.log("Unable to fetch user reservations");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }
);

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
      })
      .addCase(fetchReservationsWholeDay.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservationsWholeDay.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.specialReservations = action.payload;
      })
      .addCase(fetchReservationsWholeDay.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userReservations = action.payload;
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSpecialUserReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecialUserReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userSpecialReservations = action.payload;
      })
      .addCase(fetchSpecialUserReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reservationsSlice.reducer;
