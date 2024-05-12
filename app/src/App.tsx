import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/Profile";
import ReservationPage from "./pages/ReservationPage";
import ReservationsPage from "./pages/ReservationsPage";
import MenuPage from "./pages/MenuPage";
import AddDishPage from "./pages/AddDishPage";
import AddDrinkPage from "./pages/AddDrinkPage";
import UserRoute from "./authorization/UserRoute";
import OrderPage from "./pages/OrderPage";
import OrderListPage from "./pages/OrderListPage";
import ReservationsPageUser from "./pages/ReservationsPageUser";
import SpecialOccasionsPage from "./pages/SpecialOccasionsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/special-occasions" element={<SpecialOccasionsPage />} />
      <Route path="*" element={<HomePage />} />
      <Route element={<UserRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/add-dish" element={<AddDishPage />} />
        <Route path="/add-drink" element={<AddDrinkPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-list" element={<OrderListPage />} />
        <Route path="/my-reservations" element={<ReservationsPageUser />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
