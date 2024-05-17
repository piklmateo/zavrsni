import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../state/slices/category/categorySlice";
import { Link } from "react-router-dom";
import "./DishFrom.css";
import { AppDispatch, RootState } from "../../state/store/store";
import ToastComponent from "../ToastComponent/ToastComponent";

const Dish = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoryList = useSelector((state: RootState) => state.category.category);
  const status = useSelector((state: RootState) => state.category.status);
  const error = useSelector((state: RootState) => state.category.error);

  const [toastMessage, setToastMessage] = useState<string>("");

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

  const resetToastState = () => {
    setTimeout(() => {
      setToastMessage("");
    }, 1000);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
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
        form.reset();
        setToastMessage("Dish added succesfully");
        resetToastState();
      } else {
        console.log("Error adding dish");
        form.reset();
        setToastMessage("Failed to add dish network error...");
        resetToastState();
      }
    } catch (error) {
      console.error("Error while adding dish:", error);
    }
  };

  return (
    <div className="main__layout__container">
      <div className="add-dish__form__wrapper">
        <ToastComponent message={toastMessage} />
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
                <option key={category.id_category || index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="add__cancel__buttons">
            <div className="full__width">
              <button className="btn btn__add">Add</button>
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
