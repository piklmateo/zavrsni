import React, { useEffect, useState } from "react";
import { fetchDrinks } from "../../state/slices/drink/drinkSlice";
import { useDispatch, useSelector } from "react-redux";

const Drink = ({ category }) => {
  const dispatch = useDispatch();
  const drinkList = useSelector((state) => state.drink.drink);
  const status = useSelector((state) => state.drink.status);
  const error = useSelector((state) => state.drink.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDrinks());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const filteredDrinks = drinkList.filter((drink) => drink.category_name === category);

  return (
    <div className="menu__item__wrapper">
      {filteredDrinks.map((drink, index) => (
        <div className="menu__item" key={drink.id || index}>
          <div className="menu__item__dish">
            <div className="menu__item__title">
              <p>{drink.name}</p>
            </div>
          </div>
          <div className="menu__item__line"></div>
          <div className="menu__item__price">
            <p>{drink.price} EUR</p>
            <div className="menu__item__category">{drink.category_name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Drink;
