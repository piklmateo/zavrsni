import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./Menu.css";
import Dish from "../Dish/Dish.jsx";
import Drink from "../Drink/Drink.jsx";
import MenuFilter from "../MenuFilter/MenuFilter.jsx";
import MenuSort from "../MenuSort/MenuSort.jsx";
import AddDrinkButton from "../AddDrinkButton/AddDrinkButton.jsx";
import AddDishButton from "../AddDishButton/AddDishButton.jsx";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Main course");
  const [sortOrder, setSortOrder] = useState("price-asc");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSortOrder = (orderSort) => {
    setSortOrder(orderSort);
  };

  return (
    <>
      <div className="main__layout__container">
        <div className="menu__item__container">
          <MenuFilter
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <MenuSort handleSortOrder={handleSortOrder} />
          {selectedCategory === "Non-alcoholic beverages" ||
          selectedCategory === "White wine" ||
          selectedCategory === "Red wine" ||
          selectedCategory === "Beer" ? (
            <Drink category={selectedCategory} sortOrder={sortOrder} />
          ) : (
            <Dish category={selectedCategory} sortOrder={sortOrder} />
          )}
          {isLoggedIn && (
            <div className="add__menu__item__container">
              <AddDishButton />
              <AddDrinkButton />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
