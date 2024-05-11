import React, { useEffect } from "react";
import { fetchDishes } from "../../../state/slices/dish/dishSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Dish.css";

const Dish = ({ category, sortOrder }) => {
  const dispatch = useDispatch();
  const dishList = useSelector((state) => state.dish.dish);
  const status = useSelector((state) => state.dish.status);
  const error = useSelector((state) => state.dish.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDishes());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const filteredDishes = dishList.filter((dish) => dish.category_name === category);

  const sortedDishes = [...filteredDishes].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return a.price - b.price;
    } else if (sortOrder === "price-desc") {
      return b.price - a.price;
    } else if (sortOrder === "name-asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="menu__item__wrapper">
      {sortedDishes.map((dish, index) => (
        <div className="menu__item" key={dish.id || index}>
          <div className="menu__item__dish">
            <div className="menu__item__title">
              <p>{dish.name}</p>
            </div>
            <div className="menu__item__description">
              <p>{dish.ingridients}</p>
            </div>
          </div>
          <div className="menu__item__line"></div>
          <div className="menu__item__price">
            <p>{dish.price} EUR</p>
            <div className="menu__item__category">{dish.category_name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dish;
