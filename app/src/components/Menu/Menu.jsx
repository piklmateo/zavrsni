import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import Dish from "../Dish/Dish.jsx";
import Drink from "../Drink/Drink.jsx";
import MenuFilter from "../MenuFilter/MenuFilter.jsx";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Main course");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="main__layout__container">
        <div className="menu__item__container">
          {
            <MenuFilter
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          }
          {selectedCategory === "Non-alcoholic beverages" ||
          selectedCategory === "White wine" ||
          selectedCategory === "Red wine" ||
          selectedCategory === "Beer" ? (
            <Drink category={selectedCategory} />
          ) : (
            <Dish category={selectedCategory} />
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
