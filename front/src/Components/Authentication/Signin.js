import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import signinAnimate from "../../images/signin-animate.jpg";

/* This is the Signin component that enables user to sign in. */
export default function Signin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  let [status, setStatus] = useState("");

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
      setStatus("Sign in successful, redirecting...");
      window.location.href = "/dashboard";
    } else {
      setStatus("Sign in failure, please check your username or password");
    }
  }

  return (
    <div className="signin">
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
        <form className="form col" onSubmit={onSubmit}>
          <p>{status}</p>
          <h2 className="">Please sign in your account</h2>
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
            <button className="btn" id="custom-btn" type="submit">
              Sign in
            </button>
          </div>
          <div className="d-flex justify-content-center">
            No account yet?&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </form>
        <div className="signin-animate col">
          <img src={signinAnimate} alt="signin pic" />
          <p id="pic-credit">
            Image by <div className="space">s</div>
            <a href="https://www.freepik.com/">Freepik</a>
          </p>
        </div>
      </div>
    </div>
  );
}
