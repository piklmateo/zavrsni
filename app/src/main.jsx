import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./state/store/store.js";
import "./main.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
