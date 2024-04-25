import React from "react";
import { Link } from "react-router-dom";
import "./MenuHeader.css";

const MenuHeader = () => {
  return (
    <div className="menu__header">
      <h1 className="text__center">Menu</h1>
      {/* <div className="menu__item__buttons">
        <Link to="/add-dish">
          <button className="btn btn__dish">Add dish</button>
        </Link>
        <Link to="/add-drink">
          <button className="btn btn__drink">Add drink</button>
        </Link>
      </div> */}
    </div>
  );
};

export default MenuHeader;
