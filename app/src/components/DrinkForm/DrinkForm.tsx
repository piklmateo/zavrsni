import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../state/slices/category/categorySlice";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store/store";
import ToastComponent from "../ToastComponent/ToastComponent";
import { AddDrinkValidationSchema } from "../../validation/AddDrinkValidation";
import * as Yup from "yup";
import "./DrinkForm.css";

const DrinkForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoryList = useSelector((state: RootState) => state.category.category);
  const status = useSelector((state: RootState) => state.category.status);
  const error = useSelector((state: RootState) => state.category.error);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string>("");

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
    try {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const drinkFormData = {
        name: formData.get("name"),
        price: formData.get("price"),
        category_id: formData.get("category"),
      };

      console.log("DrinkForm:", drinkFormData);

      await AddDrinkValidationSchema.validate(drinkFormData, { abortEarly: false });
      setErrors({});
      setServerError("");

      const jwtToken = sessionStorage.getItem("token");
      const res = await fetch("https://zavrsni-server.vercel.app/api/drinks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + jwtToken,
        },
        body: JSON.stringify(drinkFormData),
      });

      if (res.ok) {
        console.log("drink added successfully");
        form.reset();
        setToastMessage("Drink added succesfully");
        resetToastState();
      } else {
        setServerError("Failed to add drink: Internal server error, check drink data.");
        console.log("Error adding drink");
        form.reset();
        setToastMessage("Failed to add drink network error...");
        resetToastState();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        setServerError("Failed to add drink: Internal server error, check drink data.");
      }
      console.error("Error while adding drink:", error);
    }
  };

  return (
    <div className="main__layout__container">
      <div className="add-drink__form__wrapper">
        <ToastComponent message={toastMessage} />
        <h1>New drink</h1>
        <form className="form" onSubmit={handleSubmit}>
          {serverError && <div className=""></div>}
          <div className="add-drink__form__name">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className={errors.name ? "error__input" : ""} />
            {errors && <div className="error__message">{errors.name}</div>}
          </div>
          <div className="add-drink__form__price">
            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" className={errors.name ? "error__input" : ""} />
            {errors && <div className="error__message">{errors.price}</div>}
          </div>
          <div className="add-drink__form__category">
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

export default DrinkForm;
