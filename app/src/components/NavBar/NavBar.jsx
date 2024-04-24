import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.png";
import { FaPhone } from "react-icons/fa6";
import "./NavBar.css";

const NavBar = () => {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
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

              {isLoggedIn && (
                <>
                  <li className="nav__list__item">
                    <Link className="nav__link" to="/reservations">
                      Reservations
                    </Link>
                  </li>
                  <li className="nav__list__item">
                    <Link className="nav__link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </>
              )}
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
