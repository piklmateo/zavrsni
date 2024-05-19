import React, { useState, ChangeEvent, FormEvent } from "react";
import { RegisterSchema } from "../../validation/RegisterValidation";
import * as Yup from "yup";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    password: "",
    email: "",
    username: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await RegisterSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setServerError("");

      const res = await fetch("http://localhost:12413/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        window.location.href = "/login";
      } else {
        setServerError("Registration failed: Internal server error...");
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
        setServerError("Registration failed: Internal server error...");
      }
    }
  };

  return (
    <div className="main__layout__container">
      <div className="register__form__wrapper">
        <h1>register</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="register__form__input register__form__name">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="john" value={formData.name} onChange={handleChange} />
            {errors.name && <div className="error__message">{errors.name}</div>}
          </div>
          <div className="register__form__input register__form__surname">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="doe"
              value={formData.surname}
              onChange={handleChange}
            />
            {errors.surname && <div className="error__message">{errors.surname}</div>}
          </div>
          <div className="register__form__input register__form__phone">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="095888333"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="error__message">{errors.phone}</div>}
          </div>
          <div className="register__form__input register__form__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error__message">{errors.email}</div>}
          </div>
          <div className="register__form__input register__form__username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="error__message">{errors.username}</div>}
          </div>
          <div className="register__form__input register__form__password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter at least 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error__message">{errors.password}</div>}
          </div>
          <button className="btn btn__register">register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
