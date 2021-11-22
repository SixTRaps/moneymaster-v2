import React from "react";
import { useState } from "react";

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
    <div className="container auth">
      <form className="form d-flex flex-column" onSubmit={onSubmit}>
        <p className="d-flex justify-content-center">
          Please enter your username and password below
        </p>
        <label className="d-flex justify-content-center">
          Username:
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
          Password:
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
        </div>
      </form>
    </div>
  );
}
