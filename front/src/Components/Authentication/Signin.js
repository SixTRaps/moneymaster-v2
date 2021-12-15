import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import signinAnimate from "../../images/signin-animate.jpg";

/* This is the Signin component that enables user to sign in. */
export default function Signin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  let [status, setStatus] = useState("");

  let navigate = useNavigate();

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
      navigate("/dashboard");
    } else {
      setStatus("Sign in failure, please check your username or password");
    }
  }

  return (
    <div className="signin" role="main">
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
          <h1 className="d-flex justify-content-center">
            Please sign in your account
          </h1>
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
            <button className="custom-btn" type="submit">
              Sign in
            </button>
          </div>
          <div className="d-flex justify-content-center">
            No account yet?&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </form>
        <div className="signin-animate">
          <img src={signinAnimate} alt="signin pic" />
          <div id="pic-credit">
            Image by <p className="space">s</p>
            <a href="https://www.freepik.com/"> Freepik</a>
          </div>
        </div>
      </div>
    </div>
  );
}
