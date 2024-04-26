import React, { useEffect, useState } from "react";
import { fetchDishes } from "../../state/slices/dish/dishSlice.js";
import { fetchDrinks } from "../../state/slices/drink/drinkSlice.js";
import { useDispatch, useSelector } from "react-redux";
import PlusIcon from "../../assets/images/plus.svg";
import MinusIcon from "../../assets/images/minus.svg";
import OrderModal from "../OrderModal/OrderModal.jsx";
import "./OrderMenu.css";

const OrderMenu = ({ category }) => {
  const dispatch = useDispatch();
  const dishList = useSelector((state) => state.dish.dish);
  const dishStatus = useSelector((state) => state.dish.status);
  const dishError = useSelector((state) => state.dish.error);
  const drinkList = useSelector((state) => state.drink.drink);
  const drinkStatus = useSelector((state) => state.drink.status);
  const drinkError = useSelector((state) => state.drink.error);

  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal

  // Function to open the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Function to handle deletion
  const handleDelete = () => {
    // Implement your deletion logic here
    closeModal(); // Close the modal after deletion
  };

  useEffect(() => {
    if (dishStatus === "idle" && drinkStatus === "idle") {
      dispatch(fetchDishes());
      dispatch(fetchDrinks());
    }
  }, [drinkStatus, dishStatus, dispatch]);

  if (dishStatus === "loading" && drinkStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (dishStatus === "failed" && drinkStatus === "failed") {
    return <div>Error: {dishError || drinkError}</div>;
  }

  const menuItems = [...drinkList, ...dishList].filter(
    (item) => item.category_name === category
  );

  return (
    <div className="order__menu__container">
      <div className="order__item__heading">
        <h1>{category}</h1>
      </div>
      <div className="order__grid">
        {menuItems.map((item) => (
          <div
            className="order__grid__item"
            key={item.id_drink || item.id_dish}
          >
            <div className="order__item__info">
              <div className="order__item__info__text">
                <h3>{item.name}</h3>
                <p>{item.price} €</p>
              </div>
              <div className="order__item__info__button">
                <button className="btn__delete" onClick={openModal}>
                  Delete
                </button>
              </div>
            </div>
            <div className="order__item__buttons">
              <button className="btn btn__minus">
                <img src={MinusIcon} alt="minus icon" width={25} height={25} />
              </button>
              <p>1</p>
              <button className="btn btn__plus">
                <img alt="plus icon" src={PlusIcon} width={25} height={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <OrderModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrderMenu;
