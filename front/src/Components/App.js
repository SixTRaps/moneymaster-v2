import React, { useState } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import axios from "axios";
// import Signin from "./signin";
import Signup from "./signup";
import Ledger from "./ledger";
import Stat from "./stat";
import Dashboard from "./dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  // const getUser = async () => {
  //   const username = await fetch("/api/user", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });
  //   setUser(username);
  // };

  function Signin() {
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
        <button type="submit">Sign in</button>
      </form>
    );
  }

  return (
    <BrowserRouter>
      <h1>Money Master</h1>
      <div>
        <h2>Your personal budget keeper</h2>
      </div>
      {!user ? (
        <div>
          <NavLink to="/signin" className="btn">
            Sign in
          </NavLink>
          <NavLink to="/signup" className="btn">
            Sign up
          </NavLink>
        </div>
      ) : (
        <Dashboard username={user} />
      )}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/stat" element={<Stat />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
