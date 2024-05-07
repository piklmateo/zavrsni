import React, { useState } from "react";
// import { useNavigate } from "react-router";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    password: "",
    email: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        return;
      }
    } catch (error) {
      console.error("register failed:", error);
    }
  };

  return (
    <div className="main__layout__container">
      <div className="register__form__wrapper">
        <h1>register</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="register__form__input register__form__name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="john"
              value={formData.name}
              onChange={handleChange}
            />
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
          </div>
          <div className="register__form__input register__form__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@mail.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="register__form__input register__form__username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="johndoe"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="register__form__input register__form__password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter at least 6 characters"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn__register">register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
