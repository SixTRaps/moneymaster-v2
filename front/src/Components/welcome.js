import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin";

export default function Welcome(props) {
  return (
    <div className="navigation">
      <h1 to="/home">Money Master</h1>
      <div>
        <h2>Your personal budget keeper</h2>
      </div>
      <NavLink to="/signin" className="btn">
        Sign in
      </NavLink>
      <NavLink to="/signup" className="btn">
        Sign up
      </NavLink>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
