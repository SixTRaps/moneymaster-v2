import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import AddBudget from "./addBudget";

export default function Dashboard(props) {
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const data = getBalanceAndBudget();
    if (data !== null) {
      setBalance(data.balance);
      setBudget(data.budget);
      console.log("balance", balance);
      console.log("budget", budget);
    }
  }, [balance, budget]);

  return (
    <div>
      {props.username === undefined ? (
        <h1>Welcome! Visitor!</h1>
      ) : (
        <div>
          <h1>Welcome! {props.username}</h1>
        </div>
      )}
      <div className="container">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-evenly">
            <NavLink to="/ledger" className="btn btn-dark" value="Ledger">
              Ledger
            </NavLink>
            <NavLink to="/stat" className="btn btn-dark" value="Statistics">
              Statistics
            </NavLink>
          </div>
          <div className="data">
            <p className="d-flex justify-content-center">
              Remaining Balance/Budget
            </p>
            <p className="d-flex justify-content-center">
              {balance}/{budget}
            </p>
            <NavLink to="/addBudget" className="btn btn-dark">
              Change Budget
            </NavLink>
          </div>
          <div>
            <Routes>
              <Route path="/addBudget" element={<AddBudget />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getBalanceAndBudget() {
  const res = await fetch("/api/getBalanceAndBudget");
  if (res.status === 200) {
    const data = await res.json();
    const balance = await data.balance;
    const budget = await data.budget;
    return [balance, budget];
  } else if (res.status === 404) {
    return [0, 0];
  }
}
