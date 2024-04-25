import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import Dish from "../Dish/Dish.jsx";
import Drink from "../Drink/Drink.jsx";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Main course");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="main__layout__container">
        <div className="menu__item__container">
          <div className="menu__navigation__container">
            <ul className="menu__navigation__list">
              <li className="menu__navigation__list__item">
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Main course" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Main course")}
                >
                  Main course
                </button>
              </li>
              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Cold appetizer" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Cold appetizer")}
                >
                  Cold appetizers
                </button>
              </li>
              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Warm appetizer" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Warm appetizer")}
                >
                  Warm appetizers
                </button>
              </li>
              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Pizza" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Pizza")}
                >
                  Pizza
                </button>
              </li>
              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Pasta" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Pasta")}
                >
                  Pasta
                </button>
              </li>
              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Non-alcoholic beverages" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Non-alcoholic beverages")}
                >
                  Non-alcoholic beverages
                </button>
              </li>

              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "White wine" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("White wine")}
                >
                  White wine
                </button>
              </li>

              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Red wine" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Red wine")}
                >
                  Red wine
                </button>
              </li>

              <li>
                <button
                  className={`menu__navigation__button ${
                    selectedCategory === "Beer" ? "menu__navigation__button-active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Beer")}
                >
                  Beer
                </button>
              </li>
            </ul>
          </div>

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
