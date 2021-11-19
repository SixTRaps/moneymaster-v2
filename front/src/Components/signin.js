import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  async function onSubmit(evt) {
    evt.preventDefault();
    axios({
      method: "post",
      data: {
        username: values.username,
        password: values.password,
      },
      withCredentials: true,
      url: "http://localhost:3001/api/signin",
    }).then((res) => console.log(res));
    alert("Sign in successful!");
    window.location.href = "/dashboard";
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
      <input type="submit" value="Sign in" />
    </form>
  );
}
