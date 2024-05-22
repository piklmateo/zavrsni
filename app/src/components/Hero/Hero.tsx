import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="main__layout__container">
        <div className="hero-section__content">
          <div className="hero-section__heading">
            <h1>Restaurant</h1>
            <h1>Vicino al cuore</h1>
          </div>
          <div className="hero-section__info">
            <h2>Work Hours</h2>
            <p>
              <span>Monday, Tuesday, Wednesday, Thursday, and Sunday</span>
              <br /> 08:00 - 22:00
            </p>
            <p>
              <span>Friday and Saturday</span>
              <br />
              10:00 - 24:00
            </p>
          </div>
          <Link to="/menu">
            <button className="hero-section__menu-button">Menu</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
