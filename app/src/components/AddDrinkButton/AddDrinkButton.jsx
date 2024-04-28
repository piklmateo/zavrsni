import React from "react";
import { useNavigate } from "react-router-dom";

import "./AddDrinkButton.css";

const AddDrinkButton = () => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/add-drink");
  };

  return (
    <>
      <button className="btn btn__drink" onClick={navigateTo}>
        Add drink
      </button>
    </>
  );
};

export default AddDrinkButton;
