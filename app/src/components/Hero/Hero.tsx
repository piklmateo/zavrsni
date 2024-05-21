import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero__container">
      <div className="main__layout__container">
        <div className="hero__content">
          <div className="hero__content-heading">
            <h1>Restaurant</h1>
            <h1>Vicino al cuore</h1>
          </div>
          <div className="hero__content-info">
            <h2>Work hours</h2>
            <p>
              <span>Monday, Tuesday, Wednesday, Thursday i Sunday</span>
              <br /> 08:00 - 22:00
            </p>
            <p>
              <span>Friday and Saturday</span>
              <br />
              10:00 - 24:00
            </p>
          </div>
          <Link to="/menu">
            <button className=" btn__menu">Menu</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
