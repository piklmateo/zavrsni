import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import About from "../components/About/About.jsx";
import Info from "../components/Info/Info.jsx";
import Menu from "../components/MenuComponents/Menu/Menu.jsx";
import Footer from "../components/Footer/Footer.jsx";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Info />
      <Menu />
      <Footer />
    </>
  );
};

export default HomePage;
