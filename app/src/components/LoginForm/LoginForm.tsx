import React, { FormEvent, useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLFormElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:12413/api/users/login", {
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
          console.error("Login failed: No Authorization header in response");
        }
      } else {
        console.error("Login failed:", res.statusText);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="main__layout__container center__login">
      <div className="login__form__wrapper">
        <div className="login__form__heading">
          <h1>Login</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="login__form__input">
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
          <div className="login__form__input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter 6 characters or more"
              required
              value={formData.password}
              onChange={handleChange}
            />
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
