import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";
import Dish from "../Dish/Dish";
import Drink from "../Drink/Drink";
import MenuFilter from "../MenuFilter/MenuFilter";
import MenuSort from "../MenuSort/MenuSort";
import AddDrinkButton from "../AddDrinkButton/AddDrinkButton";
import AddDishButton from "../AddDishButton/AddDishButton";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Main course");
  const [sortOrder, setSortOrder] = useState("price-asc");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortOrder = (orderSort: string) => {
    setSortOrder(orderSort);
  };

  const showMenuSort = location.pathname === "/menu";

  return (
    <>
      <div className="main__layout__container">
        <div className="menu__item__container">
          <MenuFilter selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
          {showMenuSort && <MenuSort handleSortOrder={handleSortOrder} />}
          {selectedCategory === "Non-alcoholic beverages" ||
          selectedCategory === "White wine" ||
          selectedCategory === "Red wine" ||
          selectedCategory === "Beer" ? (
            <Drink category={selectedCategory} sortOrder={sortOrder} />
          ) : (
            <Dish category={selectedCategory} sortOrder={sortOrder} />
          )}
          {showMenuSort && isLoggedIn && (
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
