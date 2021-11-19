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
    alert("Sign in successful!");
    console.log(res);

    window.location.href = "/";
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1>Please enter your username and password below</h1>
      <label>
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
      <label>
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
      <button type="submit">Sign in</button>
    </form>
  );
}
