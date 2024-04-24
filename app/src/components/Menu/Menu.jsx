import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const jwtToken = sessionStorage.getItem("token");
        if (jwtToken) {
          setIsLoggedIn(true);
        }

        const res = await fetch("http://localhost:12413/api/dishes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMenuItems(data);
          console.log("succesfully fetched dishes: " + data);
        } else {
          console.log("error fetching dishes");
        }
      } catch (error) {
        console.log("error:" + error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <div className="main__layout__container">
        <div className="menu__item__container">
          <h1 className="text__center">Menu</h1>
          {isLoggedIn && (
            <div className="menu__item__buttons">
              <Link to="/add-dish">
                <button className="btn btn__dish">Add dish</button>
              </Link>
              <Link to="/add-drink">
                <button className="btn btn__drink">Add drink</button>
              </Link>
            </div>
          )}

          <div className="menu__navigation__container">
            <ul className="menu__navigation__list">
              <li className="menu__navigation__list__item">
                <button className="menu__navigation__button">Main course</button>
              </li>
              <li>
                <button className="menu__navigation__button">Cold appetizers</button>
              </li>
              <li>
                <button className="menu__navigation__button">Warm appetizers</button>
              </li>
              <li>
                <button className="menu__navigation__button">Pizza</button>
              </li>
              <li>
                <button className="menu__navigation__button">Pasta</button>
              </li>
              <li>
                <button className="menu__navigation__button menu__navigation__button-active">Drinks</button>
              </li>
            </ul>
          </div>

          <div className="menu__item__wrapper">
            {menuItems.map((item, index) => (
              <div className="menu__item" key={item.id || index}>
                <div className="menu__item__dish">
                  <div className="menu__item__title">
                    <p>{item.name}</p>
                  </div>
                  <div className="menu__item__description">
                    <p>{item.ingridients}</p>
                  </div>
                </div>
                <div className="menu__item__line"></div>
                <div className="menu__item__price">
                  <p>
                    {item.price} EUR / {item.price * 7.5} KN
                  </p>
                  <div className="menu__item__category">{item.category_name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
