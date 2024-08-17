import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface Reservation {
  id_reservation: number;
  date: Date;
  time: string;
  email: string;
  user_id: number | null | undefined;
  table_id: number;
  name: string;
  phone: string;
  whole_day: string;
  table_number: number;
  time_slot: string;
}

export interface ReservationState {
  reservations: Reservation[];
  reservationsStandard: Reservation[];
  specialReservations: Reservation[];
  userReservations: Reservation[];
  userSpecialReservations: Reservation[];
  bookedDates: Reservation[];
  bookedTime: Reservation[];
  bookedTable: Reservation[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null | undefined;
}

const initialState: ReservationState = {
  reservations: [],
  reservationsStandard: [],
  specialReservations: [],
  userReservations: [],
  userSpecialReservations: [],
  bookedDates: [],
  bookedTime: [],
  bookedTable: [],
  status: "idle",
  error: null,
};

interface DecodedToken extends JwtPayload {
  user: {
    id_user: number;
    email: string;
    role_id: number;
  };
}

export const fetchReservations = createAsyncThunk("reservations/fetchReservations", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
      return [];
    }

    const res = await fetch("https://zavrsni-server.vercel.app/api/reservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch reservations");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

export const fetchReservationsStandard = createAsyncThunk("reservations/fetchReservationsStandard", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
      return [];
    }

    const res = await fetch("https://zavrsni-server.vercel.app/api/reservations/standard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch reservations");
    }
    const data = await res.json();
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

    const res = await fetch("https://zavrsni-server.vercel.app/api/reservations/special", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch reservations");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

export const fetchBookedDates = createAsyncThunk("reservations/fetchBookedDates", async () => {
  try {
    const res = await fetch("https://zavrsni-server.vercel.app/api/reservations/bookedDate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch reservations");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

export const fetchBookedTime = createAsyncThunk("reservations/fetchBookedTime", async (date: string) => {
  try {
    const res = await fetch(`https://zavrsni-server.vercel.app/api/reservations/bookedTime/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch reservations");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
});

export const fetchBookedTables = createAsyncThunk(
  "reservations/fetchBookedTables",
  async ({ date, time }: { date: string; time: string }) => {
    try {
      const res = await fetch(`https://zavrsni-server.vercel.app/api/reservations/bookedTables/${date}/${time}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }
);

export const fetchUserReservations = createAsyncThunk("reservationsUser/fetchUserReservations", async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("You don't have a valid token");
      return [];
    }
    const decodedToken = jwtDecode(token) as DecodedToken;
    const id_user = decodedToken.user.id_user;

    const res = await fetch("https://zavrsni-server.vercel.app/api/users/reservations/" + id_user, {
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
      const decodedToken = jwtDecode(token) as DecodedToken;
      const id_user = decodedToken.user.id_user;

      const res = await fetch("https://zavrsni-server.vercel.app/api/users/reservations/special/" + id_user, {
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
        state.status = "succeded";
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReservationsStandard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservationsStandard.fulfilled, (state, action) => {
        state.status = "succeded";
        state.reservationsStandard = action.payload;
      })
      .addCase(fetchReservationsStandard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReservationsWholeDay.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservationsWholeDay.fulfilled, (state, action) => {
        state.status = "succeded";
        state.specialReservations = action.payload;
      })
      .addCase(fetchReservationsWholeDay.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookedDates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookedDates.fulfilled, (state, action) => {
        state.status = "succeded";
        state.bookedDates = action.payload;
      })
      .addCase(fetchBookedDates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookedTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookedTime.fulfilled, (state, action) => {
        state.status = "succeded";
        state.bookedTime = action.payload;
      })
      .addCase(fetchBookedTime.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookedTables.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookedTables.fulfilled, (state, action) => {
        state.status = "succeded";
        state.bookedTable = action.payload;
      })
      .addCase(fetchBookedTables.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.status = "succeded";
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
        state.status = "succeded";
        state.userSpecialReservations = action.payload;
      })
      .addCase(fetchSpecialUserReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reservationsSlice.reducer;
