import React from "react";
import { FaInstagram, FaFacebook, FaShareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./TopHeader.css";

function TopHeader() {
  return (
    <div className="top__header">
      <div className="main__layout__container">
        <div className="info__container">
          <div className="social__icons">
            <div className="icon">
              <FaShareAlt />
            </div>
            <div className="icon">
              <FaFacebook />
            </div>
            <div className="icon">
              <FaInstagram />
            </div>
          </div>
          <div className="location__info">
            <FaLocationDot />
            <p>83100 Avellino AV, Italia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
