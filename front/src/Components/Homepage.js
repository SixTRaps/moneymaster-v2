import React from "react";
import { Link } from "react-router-dom";
import animate from "../images/animate.jpg";
import arrow from "../images/arrow.png";

/* This is the Homepage component that displays welcome message
   if the user has not signed in. Otherwise, it will display the
   Dashboard. */
export default function Homepage() {
  return (
    <div>
      <div className="container homepage-container d-flex align-items-center">
        <div className="row">
          <div className="col-6 d-flex align-items-center left">
            <div className="d-flex flex-column">
              <h2>Money Master</h2>
              <h3>Your personal budget keeper</h3>
              <p>
                Records all your daily expenses and displays them in data and
                diagrams!
              </p>
              <Link to="/signin" className="link">
                Sign in
                <img src={arrow} alt="register-arrow" />
              </Link>
              <br />
              <Link to="/signup" className="link">
                Sign up
                <img src={arrow} alt="register-arrow" />
              </Link>
            </div>
          </div>
          <div className="col-6">
            <img
              src={animate}
              alt="homepage animate"
              className="homepage-animate"
            />
            <div id="pic-credit">
              Image by <p className="space">s</p>
              <a href="https://www.freepik.com/">Freepik</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
