import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddDishButton.css";

const AddDishButton = () => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/add-drink");
  };
  return (
    <>
      <button className="btn btn__dish" onClick={navigateTo}>
        Add dish
      </button>
    </>
  );
};

export default AddDishButton;
