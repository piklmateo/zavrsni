import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: [],
  status: "idle",
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("profile-token");
      if (!token) {
        console.log("You don't have a valid token");
        return [];
      }
      const decodedToken = jwtDecode(token);
      const id_user = decodedToken.user.id_user;
      const res = await fetch(`http://localhost:12413/api/users/${id_user}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
