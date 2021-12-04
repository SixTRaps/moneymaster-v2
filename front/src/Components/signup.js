import React from "react";
import logo from "../images/logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import signupAnimate from "../images/signup-animate.jpg";

/* This is the Signup component that enables user to sign up an new account. */
export default function Signup() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });

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
      alert("Username exists, please go to sign in");
    } else if (res.status === 200) {
      alert("Sign up successful!");
      window.location.href = "/";
    }
  };

  return (
    <div className="signup">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <NavLink to="/">
            <img
              src={logo}
              alt="moneyMaster logo"
              width="40"
              height="40"
              className="d-inline-block"
            />
          </NavLink>
          <span className="brand">MONEY MASTER</span>
        </div>
      </nav>
      <div className="container signin-container d-flex align-items-center">
        <form className="form" onSubmit={onSubmit}>
          <h2 className="">Please fill in following infos below</h2>
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
            <button className="btn btn-dark" type="submit">
              Sign Up
            </button>
            <span>
              Already has an account?&nbsp;
              <NavLink to="/signin" className="btn btn-warning">
                Sign In
              </NavLink>
            </span>
          </div>
        </form>
        <div className="signup-animate">
          <img src={signupAnimate} alt="signin pic" />
          <p>The image is retrieved from www.freepik.com</p>
        </div>
      </div>
    </div>
  );
}
