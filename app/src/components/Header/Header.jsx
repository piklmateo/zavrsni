import React from "react";
import TopHeader from "../TopHeader/TopHeader.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import "./Header.css";

function Header() {
  return (
    <>
      <header>
        <TopHeader />
        <NavBar />
      </header>
    </>
  );
}

export default Header;
