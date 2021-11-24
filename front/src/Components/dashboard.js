import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard(props) {
  const [budget, setBudget] = useState("0");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function lookup() {
      const data = await getBalanceAndBudget();
      if (data) {
        setBalance(data[0]);
        setBudget(data[1]);
      }
    }
    lookup();
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
            <NavLink
              to="/newTransaction"
              className="btn btn-dark"
              value="NewTransaction"
            >
              New Transaction
            </NavLink>
            <NavLink
              to="/showTransactions"
              className="btn btn-dark"
              value="ShowTransaction"
            >
              All Transactions
            </NavLink>
            <NavLink
              to="/statistics"
              className="btn btn-dark"
              value="Statistics"
            >
              Statistics
            </NavLink>
            <form action="/api/logout?_method=DELETE" method="POST">
              <button className="btn btn-warning btn-width" type="submit">
                Log Out
              </button>
            </form>
          </div>
          <div className="data d-flex flex-column">
            <p className="d-flex justify-content-center">
              Remaining Balance/Budget
            </p>
            <p className="d-flex justify-content-center">
              {balance}/{budget}
            </p>
            <div className="d-flex justify-content-center">
              <NavLink to="/addBudget" className="btn btn-dark">
                Change Budget
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getBalanceAndBudget() {
  const res = await fetch("./api/getBalanceAndBudget", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.status === 200) {
    const data = await res.json();
    const balance = await data.balance;
    const budget = await data.budget;
    return [balance, budget];
  } else if (res.status === 404) {
    return ["0", "0"];
  }
}
