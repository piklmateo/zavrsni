import React from "react";
import "./Info.css";

const Info = () => {
  return (
    <section className="info__section">
      <div className="main__layout__container">
        <div className="info__grid">
          <div className="grid__item address">
            <h3>Address</h3>
            <p>83100 Avellino AV, Italia</p>
          </div>
          <div className="grid__item info">
            <h3>For more info</h3>
            <p>nest@nest.com</p>
            <p>040-319-067</p>
          </div>
          <div className="grid__item work__hours">
            <h3>Work hours</h3>
            <p>
              <span>Monday, Tuesday, Wednesday, Thursday i Sunday</span>
              <br /> 08:00 - 22:00
            </p>
            <p>
              <span>Friday and Saturday</span>
              <br />
              10:00 - 24:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
