import React from "react";

const MenuFilter = ({ selectedCategory, handleCategoryClick }) => {
  return (
    <div className="menu__navigation__container">
      <ul className="menu__navigation__list">
        <li className="menu__navigation__list__item">
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Main course"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Main course")}
          >
            Main course
          </button>
        </li>
        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Cold appetizer"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Cold appetizer")}
          >
            Cold appetizers
          </button>
        </li>
        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Warm appetizer"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Warm appetizer")}
          >
            Warm appetizers
          </button>
        </li>
        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Pizza"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Pizza")}
          >
            Pizza
          </button>
        </li>
        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Pasta"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Pasta")}
          >
            Pasta
          </button>
        </li>
        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Non-alcoholic beverages"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Non-alcoholic beverages")}
          >
            Non-alcoholic beverages
          </button>
        </li>

        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "White wine"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("White wine")}
          >
            White wine
          </button>
        </li>

        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Red wine"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Red wine")}
          >
            Red wine
          </button>
        </li>

        <li>
          <button
            className={`menu__navigation__button ${
              selectedCategory === "Beer"
                ? "menu__navigation__button-active"
                : ""
            }`}
            onClick={() => handleCategoryClick("Beer")}
          >
            Beer
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuFilter;
