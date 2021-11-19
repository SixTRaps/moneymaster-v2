import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";
import Ledger from "./ledger";
import Stat from "./stat";
import Dashboard from "./dashboard";

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
      <h1>Money Master</h1>
      <div>
        <h2>Your personal budget keeper</h2>
      </div>
      {user === undefined ? (
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

async function getUsername() {
  const res = await fetch("/api/user");
  if (res.status === 200) {
    const users = await res.json();
    const username = await users.username;
    console.log("username:", username);
    return username;
  }
}
