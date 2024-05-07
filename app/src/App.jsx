import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ProfilePage from "./pages/Profile.jsx";
import ReservationPage from "./pages/ReservationPage.jsx";
import ReservationsPage from "./pages/ReservationsPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import AddDishPage from "./pages/AddDishPage.jsx";
import AddDrinkPage from "./pages/AddDrinkPage.jsx";
import UserRoute from "./authorization/UserRoute.js";
import OrderPage from "./pages/OrderPage.jsx";
import OrderListPage from "./pages/OrderListPage.jsx";
import ReservationsPageUser from "./pages/ReservationsPageUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="*" element={<HomePage />} />
      <Route element={<UserRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/add-dish" element={<AddDishPage />} />
        <Route path="/add-drink" element={<AddDrinkPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-list" element={<OrderListPage />} />
        <Route path="/reservations-user" element={<ReservationsPageUser />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
