import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../state/slices/category/categorySlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./DishFrom.css";

const Dish = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.category);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const dishData = {
      name: formData.get("name"),
      ingridients: formData.get("ingridients"),
      price: formData.get("price"),
      category_id: formData.get("category"),
    };
    console.log("dish:", dishData);

    try {
      const jwtToken = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:12413/api/dishes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + jwtToken,
        },
        body: JSON.stringify(dishData),
      });

      if (res.ok) {
        console.log("Dish added successfully");
        navigate("/menu");
      } else {
        console.log("Error adding dish");
      }
    } catch (error) {
      console.error("Error while adding dish:", error);
    }
  };

  return (
    <div className="main__layout__container">
      <div className="add-dish__form__wrapper">
        <h1>New dish</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="add-dish__form__name">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div className="add-dish__form__ingridients">
            <label htmlFor="ingridients">Ingridients</label>
            <textarea name="ingridients" id="ingridients" required></textarea>
          </div>
          <div className="add-dish__form__price">
            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" required />
          </div>
          <div className="add-dish__form__category">
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              {categoryList.map((category, index) => (
                <option key={category.category_id || index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="add__dish__buttons">
            <div className="full__width">
              <button className="btn btn__add-dish">Add</button>
            </div>
            <div className="full__width">
              <Link to="/menu">
                <button className="btn btn__cancel">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dish;
