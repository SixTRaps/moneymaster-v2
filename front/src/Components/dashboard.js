import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  let username;
  async function getUsername() {
    const res = await fetch("./api/user");
    username = await res.json().username;
    console.log("username:", username);
    console.log("res.body:", res.body.json());
  }

  return (
    <div>
      <button onClick={getUsername}>get</button>
      <h1>Welcome! {username}</h1>
      <div>
        Remaining Balance/Budget:{balance}/{budget}
      </div>
      <NavLink to="/ledger" className="btn" value="Ledger" />
      <NavLink to="/stat" className="btn" value="Statistics" />
    </div>
  );
}
