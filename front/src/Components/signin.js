import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import signinAnimate from "../images/signin-animate.jpg";

/* This is the Signin component that enables user to sign in. */
export default function Signin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  async function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      username: values.username,
      password: values.password,
    };
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      alert("Sign in successful!");
    } else {
      alert("Sign in failure, please check your username or password");
    }
    window.location.href = "/";
  }

  return (
    <div className="signin">
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
          <h2 className="">Please enter your username and password below</h2>
          <br />
          <label className="d-flex justify-content-center">
            <p>Username:&nbsp;</p>
            <input
              type="text"
              value={values.username}
              onChange={(e) =>
                setValues((values) => ({
                  username: e.target.value,
                  password: values.password,
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
                  username: values.username,
                  password: e.target.value,
                }))
              }
              required={true}
            />
          </label>
          <br />
          <div className="d-flex justify-content-center">
            <button className="btn btn-dark" type="submit">
              Sign in
            </button>
            <span>
              No account yet?&nbsp;
              <NavLink to="/signup" className="btn btn-warning">
                Sign Up
              </NavLink>
            </span>
          </div>
        </form>
        <div className="signin-animate">
          <img src={signinAnimate} alt="signin pic" />
          <p>The image is retrieved from www.freepik.com</p>
        </div>
      </div>
    </div>
  );
}
