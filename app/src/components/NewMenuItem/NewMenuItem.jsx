import React from "react";
import { Link } from "react-router-dom";
import "./NewMenuItem.css";

const NewMenuItem = () => {
  return (
    <>
      <div className="menu__item__buttons">
        <Link to="/add-dish">
          <button className="btn btn__dish">Add dish</button>
        </Link>
        <Link to="/add-drink">
          <button className="btn btn__drink">Add drink</button>
        </Link>
      </div>
    </>
  );
};

export default NewMenuItem;
