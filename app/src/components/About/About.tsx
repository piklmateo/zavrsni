import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about__section">
      <div className="main__layout__container">
        <div className="about__container">
          <div className="about__heading">
            <h2>About us</h2>
          </div>
          <div className="about__content">
            <p className="text-justify">
              Welcome to <span className="bold">Restaurant Vicino al cuore</span>, a place where culinary passion meets
              authentic Italian traditions. Nestled in the heart of Avellino, our restaurant is a celebration of Italy’s
              rich gastronomic heritage, offering a warm and inviting atmosphere that feels just like home. At{" "}
              <span className="bold">Restaurant Vicino al cuore</span>, we believe that food is more than just
              nourishment—it’s an experience. Our chefs craft each dish with care, using the finest ingredients to bring
              the true flavors of Italy to your table. Our menu is designed to cater to all tastes. We take pride in our
              commitment to quality, ensuring that every meal we serve is a testament to our love for good food and
              great company.
            </p>

            <p className="text-justify">
              Join us for a memorable dining experience, whether you're celebrating a special occasion or simply
              enjoying a night out. At Vicino al cuore, you’re always close to the heart of exceptional dining. We look
              forward to welcoming you and making your visit truly special.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
