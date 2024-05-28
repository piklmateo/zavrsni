import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.webp";
import { JwtPayload, jwtDecode } from "jwt-decode";
import "./NavBar.css";

interface DecodedToken extends JwtPayload {
  user: {
    id_user: number;
    username: string;
    role: number;
  };
}

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allowedRoutes, setAllowedRoutes] = useState<string[]>([]);
  const [isMobileNav, setIsMobileNav] = useState<boolean>(false);

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
    2: ["/menu", "/add-dish", "/add-drink", "/order", "/order-list"], // KUHAR
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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token) as DecodedToken;
      const role = decodedToken.user.role;
      setAllowedRoutes(roleRoutes[role] || []);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const handleMobileNav = () => {
    setIsMobileNav(!isMobileNav);
  };

  return (
    <div className="nav__header">
      <div className="main__layout__container">
        <div className="container">
          <div className="logo__container">
            <img className="logo__navigation" src={logo} alt="logo" />
            <div className="burger__menu" onClick={handleMobileNav}>
              <div className={`bar ${isMobileNav ? "bar--open" : ""}`}></div>
              <div className={`bar ${isMobileNav ? "bar--open" : ""}`}></div>
              <div className={`bar ${isMobileNav ? "bar--open" : ""}`}></div>
            </div>
          </div>
          <nav className={`nav__menu ${isMobileNav ? "nav__menu--open" : ""}`}>
            <ul className="nav__list">
              <li className="nav__list__item">
                <Link className="nav__link" to="/" onClick={handleMobileNav}>
                  Home
                </Link>
              </li>
              <li className="nav__list__item">
                <Link
                  className="nav__link"
                  to="/menu"
                  onClick={handleMobileNav}
                >
                  Menu
                </Link>
              </li>
              <li className="nav__list__item">
                <Link
                  className="nav__link"
                  to="/reservation"
                  onClick={handleMobileNav}
                >
                  Reservation
                </Link>
              </li>
              <li className="nav__list__item">
                <Link
                  className="nav__link"
                  to="/special-occasions"
                  onClick={handleMobileNav}
                >
                  Special occasions
                </Link>
              </li>
              {isLoggedIn &&
                allowedRoutes.map((route, index) => {
                  if (route === "/reservations") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link
                          className="nav__link"
                          to={route}
                          onClick={handleMobileNav}
                        >
                          Reservations
                        </Link>
                      </li>
                    );
                  } else if (route === "/profile") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link
                          className="nav__link"
                          to={route}
                          onClick={handleMobileNav}
                        >
                          Profile
                        </Link>
                      </li>
                    );
                  } else if (route === "/my-reservations") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link
                          className="nav__link"
                          to={route}
                          onClick={handleMobileNav}
                        >
                          My Reservations
                        </Link>
                      </li>
                    );
                  } else if (route === "/order") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link
                          className="nav__link"
                          to={route}
                          onClick={handleMobileNav}
                        >
                          Order
                        </Link>
                      </li>
                    );
                  } else if (route === "/order-list") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link
                          className="nav__link"
                          to={route}
                          onClick={handleMobileNav}
                        >
                          Order list
                        </Link>
                      </li>
                    );
                  } else if (route === "/statistics") {
                    return (
                      <li key={index} className="nav__list__item">
                        <Link
                          className="nav__link"
                          to={route}
                          onClick={handleMobileNav}
                        >
                          Statistics
                        </Link>
                      </li>
                    );
                  }
                  return null;
                })}
            </ul>
          </nav>
          <div className={`nav__menu ${isMobileNav ? "nav__menu--open" : ""}`}>
            <div className="contact__container">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={handleMobileNav}>
                    <button className="btn btn__login">Login</button>
                  </Link>
                  <Link to="/registration" onClick={handleMobileNav}>
                    <button className="btn btn__register">Register</button>
                  </Link>
                </>
              ) : (
                <button className="btn btn__logout" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
