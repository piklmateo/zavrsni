import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  user: {
    id_user: number;
    username: string;
    role: number;
  };
}

const UserRoute = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  const decodedToken = jwtDecode(token!) as DecodedToken;
  const role = decodedToken.user.role;

  const roleRoutes: { [key: number]: string[] } = {
    1: [
      "/menu",
      "/profile",
      "/reservations",
      "/add-dish",
      "/add-drink",
      "/order",
      "/order-list",
      "/statistics",
    ], // ADMIN
    2: ["/menu", "/add-dish", "/add-drink", "/order-list", "/order"], // KUHAR
    3: [
      "/menu",
      "/reservations",
      "/add-drink",
      "/add-dish",
      "/order",
      "/order-list",
    ], // KONOBAR
    4: ["/profile", "/my-reservations"], // KORISNIK
  };

  const currentRoute = window.location.pathname;
  const allowedRoutes = roleRoutes[role] || [];
  if (!allowedRoutes.includes(currentRoute)) {
    navigate("/");
  }

  return <Outlet />;
};

export default UserRoute;
