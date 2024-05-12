import React from "react";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Info from "../components/Info/Info";
import Menu from "../components/MenuComponents/Menu/Menu";
import Footer from "../components/Footer/Footer";

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
