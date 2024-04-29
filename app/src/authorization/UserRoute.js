import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserRoute = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);
  const role = decodedToken.user.role;

  const roleRoutes = {
    1: [
      "/menu",
      "/profile",
      "/reservations",
      "/add-dish",
      "/add-drink",
      "/order",
      "/order-list",
    ], // ADMIN
    2: ["/menu", "/add-dish", "/add-drink", "/order", "/order-list"], // KUHAR
    3: [
      "/menu",
      "/reservations",
      "/add-drink",
      "/add-dish",
      "/order",
      "/order-list",
    ], // KONOBAR
    4: ["/profile"], // KORISNIK
  };

  const currentRoute = window.location.pathname;
  const allowedRoutes = roleRoutes[role] || [];
  if (!allowedRoutes.includes(currentRoute)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoute;
