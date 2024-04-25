import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.png";
import { jwtDecode } from "jwt-decode";
import "./NavBar.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  const roleRoutes = {
    1: ["/menu", "/profile", "/reservations", "/add-dish", "/add-drink"], // ADMIN
    2: ["/menu", "/add-dish", "/add-drink"], // KUHAR
    3: ["/menu", "/reservations", "/add-drink", "/add-dish"], // KONOBAR
    4: ["/profile"], // KORISNIK
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      const role = decodedToken.user.role;
      setAllowedRoutes(roleRoutes[role] || []);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <div className="nav__header">
      <div className="main__layout__container">
        <div className="container">
          <div className="logo__container">
            <img className="logo__navigation" src={logo} alt="logo" />
          </div>
          <nav className="nav__menu">
            <ul className="nav__list">
              <li className="nav__list__item">
                <Link className="nav__link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav__list__item">
                <Link className="nav__link" to="/menu">
                  Menu
                </Link>
              </li>
              <li className="nav__list__item">
                <Link className="nav__link" to="/reservation">
                  Reservation
                </Link>
              </li>

              {isLoggedIn &&
                allowedRoutes.map((route, index) => {
                  if (route === "/reservations") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link className="nav__link" to={route}>
                          Reservations
                        </Link>
                      </li>
                    );
                  } else if (route === "/profile") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link className="nav__link" to={route}>
                          Profile
                        </Link>
                      </li>
                    );
                  }
                  return null;
                })}
            </ul>
          </nav>

          <div className="contact__container">
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <button className="btn btn__login">Login</button>
                </Link>
                <Link to="/registration">
                  <button className="btn btn__register">Register</button>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <button className="btn btn__logout" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
