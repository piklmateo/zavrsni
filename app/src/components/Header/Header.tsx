import React from "react";
import TopHeader from "../TopHeader/TopHeader";
import NavBar from "../NavBar/NavBar";
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
