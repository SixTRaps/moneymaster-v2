import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";
import Transaction from "./Transaction/transaction";
import Stat from "./stat";
import Dashboard from "./dashboard";
import logo from "../images/logo.png";
import "../stylesheets/style.css";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
      console.log(username);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="main-part">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <div className="navbar-brand">
              <img
                src={logo}
                alt="moneyMaster logo"
                width="40"
                height="40"
                className="d-inline-block"
              />
              <span className="brand">Money Master</span>
            </div>
          </div>
        </nav>
        <div className="welcome container">
          {user === undefined ? (
            <div>
              <div className="d-flex align-items-center flex-column">
                <h1>Money Master</h1>
              </div>
              <div className="d-flex align-items-center flex-column">
                <h2>Your personal budget keeper</h2>
              </div>
              <div className="sign-buttons d-flex justify-content-evenly align-items-center">
                <NavLink to="/signin" className="btn btn-warning">
                  Sign in
                </NavLink>
                <NavLink to="/signup" className="btn btn-warning">
                  Sign up
                </NavLink>
              </div>
              <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/stat" element={<Stat />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          ) : (
            <Dashboard username={user} />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

async function getUsername() {
  const res = await fetch("/api/user");
  if (res.status === 200) {
    const users = await res.json();
    const username = await users.username;
    console.log("username:", username);
    return username;
  }
}
