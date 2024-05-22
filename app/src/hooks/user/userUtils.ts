import { updateUser, User } from "../../state/slices/user/userSlice";
import { fetchUserData } from "../../state/slices/user/userSlice"; // Correct import

import { jwtDecode, JwtPayload } from "jwt-decode";
import { Dispatch } from "@reduxjs/toolkit";

interface DecodedToken extends JwtPayload {
  user: {
    id_user: number;
    username: string;
    role_id: number;
  };
}

export const updateUserProfile = async (event: React.FormEvent<HTMLFormElement>, formData: User, dispatch: any) => {
  event.preventDefault();

  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("User doesn't have a valid token");
      return { success: false };
    }
    const decodedToken = jwtDecode(token!) as DecodedToken;
    const id_user = decodedToken.user.id_user;

    const res = await fetch(`zavrsni-server-git-main-mateos-projects-26cbfc3e.vercel.app/api/users/${id_user}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      console.log("User profile updated successfully");
      dispatch(fetchUserData());
      return { success: true };
    } else {
      console.log("Failed to update user profile");
      return { success: false };
    }
  } catch (error) {
    console.log("Error: " + error);
    return { success: false };
  }
};
