import React from "react";
import { useState } from "react";

export default function Signin() {
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
    console.log(data);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
    alert("Sign up successful!");
    // window.location.href = "/dashboard";
  };

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
              ...values,
              username: e.target.value,
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
              ...values,
              password: e.target.value,
            }))
          }
          required={true}
        />
      </label>
      <br />
      <label>
        Firstname:
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
      <label>
        Lastname:
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
      <input type="submit" value="Sign up" />
    </form>
  );
}
