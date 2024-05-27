import React from "react";
// import { FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6/index.esj";
import "./TopFooter.css";
import logo from "../../assets/images/logo-transparent.png";

const TopFooter = () => {
  return (
    <>
      <footer className="footer__container">
        <div className="main__layout__container">
          <div className="footer__grid">
            <div className="footer__grid__item footer__logo">
              <img className="logo__footer" src={logo} alt="logo" />
            </div>
            <div className="footer__grid__item footer__address">
              <h3>Address</h3>
              <div className="icons">
                {/* <FaLocationDot /> */}
                <p>83100 Avellino AV Italia</p>
              </div>
              <h3>Contact</h3>
              <div className="icons">
                {/* <FaEnvelope /> */}
                <p>nest@nest.com</p>
              </div>
              <div className="icons">
                {/* <FaPhone /> */}
                <p>040-319-067</p>
              </div>
            </div>
            <div className="footer__grid__item footer__working__hours">
              <h3>Work hours</h3>
              <p>
                <span>Monday - Thursday</span>
                <br /> 08:00 - 22:00
              </p>
              <p>
                <span>Friday - Sunday</span>
                <br />
                10:00 - 24:00
              </p>
            </div>
            <div className="footer__grid__item footer__location">
              <h3>Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24117.646342617645!2d14.774544147328783!3d40.92219629430587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bcc55125ad8dd%3A0xa1275dba604eda!2s83100%20Avellino%2C%20Province%20of%20Avellino%2C%20Italy!5e0!3m2!1sen!2shr!4v1712831578870!5m2!1sen!2shr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default TopFooter;
