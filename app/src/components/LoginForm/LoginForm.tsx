import React, { FormEvent, useState } from "react";
import { LoginSchema } from "../../validation/LoginValidation";
import * as Yup from "yup";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string>("");

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await LoginSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setServerError("");

      const res = await fetch("zavrsni-server-git-main-mateos-projects-26cbfc3e.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const authHeader = res.headers.get("Authorization");
        console.log("TAJ HEDER: " + authHeader);
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          console.log("TOKEN NA FRONTENDU: " + token);
          sessionStorage.setItem("token", token);
          window.location.href = "/";
        } else {
          setServerError("Login failed: Wrong username or password...");
        }
      } else {
        const errorData = await res.json();
        setServerError(errorData.message || "Login failed");
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
        setServerError("Login failed: Wrong username or password...");
      }
    }
  };

  return (
    <div className="main__layout__container center__login">
      <div className="login__form__wrapper">
        <div className="login__form__heading">
          <h1>Login</h1>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {serverError && <div className="error__server">{serverError}</div>}
          <div className="login__form__input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error__input" : ""}
            />
            {errors.username && <div className="error__message">{errors.username}</div>}
          </div>
          <div className="login__form__input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter 6 characters or more"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error__input" : ""}
            />
            {errors.password && <div className="error__message">{errors.password}</div>}
          </div>
          <div>
            <button className="btn btn__login" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
