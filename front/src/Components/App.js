import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homepage";
import Signin from "./signin";
import Signup from "./signup";
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
      <Routes>
        <Route path="/" exact element={<HomePage user={user} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stat" element={<Stat />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
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
