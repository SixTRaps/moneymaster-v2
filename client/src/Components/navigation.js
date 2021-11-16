import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin";

export default function Navigation() {
  return (
    <BrowserRouter>
      <div className="navigation">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              Money Master
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/ledger" className="nav-link">
                    Ledger
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/stat" className="nav-link">
                    Statistics
                  </NavLink>
                </li>
              </ul>
              <div id="user" className="ms-auto"></div>
            </div>
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link">
                    Sign in
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/stat" element={<Stat />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Ledger() {
  return (
    <div>
      <h2>Ledger</h2>
    </div>
  );
}

function Stat() {
  return (
    <div>
      <h2>Stat</h2>
    </div>
  );
}
