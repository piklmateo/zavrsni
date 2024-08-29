import React, { useEffect, useState } from "react";
import { fetchDrinks } from "../../../state/slices/drink/drinkSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store/store";

interface DrinkProps {
  category: string;
  sortOrder: string;
}

const Drink = ({ category, sortOrder }: DrinkProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const drinkList = useSelector((state: RootState) => state.drink.drink);
  const status = useSelector((state: RootState) => state.drink.status);
  const error = useSelector((state: RootState) => state.drink.error);

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const filteredDrinks = drinkList.filter((drink) => drink.category_name === category);

  const sortedDrinks = [...filteredDrinks].sort((a, b) => {
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
      {sortedDrinks.map((drink, index) => (
        <div className="menu__item" key={drink.id_drink || index}>
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
