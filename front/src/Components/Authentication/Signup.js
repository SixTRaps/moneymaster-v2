import React from "react";
import logo from "../../images/logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import signupAnimate from "../../images/signup-animate.jpg";

/* This is the Signup component that enables user to sign up an new account. */
export default function Signup() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  let [status, setStatus] = useState("");

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const data = {
      username: values.username,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
    };
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 409) {
      setStatus("Username exists, please go to sign in");
    } else if (res.status === 200) {
      setStatus("Sign up successful, redirecting...");
      window.location.href = "signin";
    }
  };

  return (
    <div className="signup" role="main">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <NavLink to="/" className="brand">
            <img
              src={logo}
              alt="moneyMaster logo"
              width="40"
              height="40"
              className="d-inline-block"
            />
            <span className="brand"> MONEY MASTER </span>
          </NavLink>
        </div>
      </nav>
      <div className="container signin-container d-flex align-items-center">
        <form className="form" onSubmit={onSubmit}>
          <p>{status}</p>
          <h1>Welcome to Money Master</h1>
          <br />
          <label className="d-flex justify-content-center">
            <p>Username:&nbsp;</p>
            <input
              type="text"
              value={values.username}
              onChange={(e) =>
                setValues((values) => ({
                  ...values,
                  username: e.target.value,
                }))
              }
              required={true}
            />
          </label>
          <br />
          <label className="d-flex justify-content-center">
            <p>Password:&nbsp;</p>
            <input
              type="password"
              value={values.password}
              onChange={(e) =>
                setValues((values) => ({
                  ...values,
                  password: e.target.value,
                }))
              }
              required={true}
            />
          </label>
          <br />
          <label className="d-flex justify-content-center">
            <p>Firstname:&nbsp;</p>
            <input
              type="text"
              value={values.firstname}
              onChange={(e) =>
                setValues((values) => ({
                  ...values,
                  firstname: e.target.value,
                }))
              }
              required={true}
            />
          </label>
          <br />
          <label className="d-flex justify-content-center">
            <p>Lastname:&nbsp;</p>
            <input
              type="text"
              value={values.lastname}
              onChange={(e) =>
                setValues((values) => ({
                  ...values,
                  lastname: e.target.value,
                }))
              }
              required={true}
            />
          </label>
          <br />
          <div className="d-flex justify-content-center">
            <button className="custom-btn" type="submit">
              Sign Up
            </button>
          </div>
          <span className="d-flex justify-content-center">
            Already has an account?&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
          </span>
        </form>
        <div className="signup-animate">
          <img src={signupAnimate} alt="signin pic" />
          <div id="pic-credit">
            Image by <p className="space">s</p>
            <a href="https://www.freepik.com/">Freepik</a>
          </div>
        </div>
      </div>
    </div>
  );
}
