import React from "react";
import share from "../../assets/images/share.svg";
import facebook from "../../assets/images/fb.svg";
import instagram from "../../assets/images/ig.svg";
import location from "../../assets/images/location--white.svg";
import "./TopHeader.css";

function TopHeader() {
  return (
    <div className="top__header">
      <div className="main__layout__container">
        <div className="info__container">
          <div className="social__icons">
            <div className="icon">
              <img src={share} alt="share_icon" width={16} height={16} />
            </div>
            <div className="icon">
              <img src={facebook} alt="facebook_icon" width={16} height={16} />
            </div>
            <div className="icon">
              <img
                src={instagram}
                alt="instagram_icon"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className="location__info">
            <img src={location} alt="location_icon" width={16} height={16} />

            <p>83100 Avellino AV, Italia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
