import { jwtDecode } from "jwt-decode";
import { updateUser } from "../../state/slices/user/userSlice";

export const updateUserProfile = async (event, formData, dispatch) => {
  event.preventDefault();

  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("User doesn't have a valid token");
    }
    const decodedToken = jwtDecode(token);
    const id_user = decodedToken.user.id_user;

    const res = await fetch(`http://localhost:12413/api/users/${id_user}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      dispatch(updateUser(formData));
      window.location.reload();
      console.log("User profile updated successfully");
    } else {
      console.log("Failed to update user profile");
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};
