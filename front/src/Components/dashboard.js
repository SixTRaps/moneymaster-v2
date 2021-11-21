import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import AddBudget from "./addBudget";
import Transaction from "./transaction";

export default function Dashboard(props) {
  const [budget, setBudget] = useState("0");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function lookup() {
      const data = await getBalanceAndBudget();
      console.log("useEffect data", data);
      if (data) {
        setBalance(data[0]);
        setBudget(data[1]);
      }
      console.log("balance", balance);
      console.log("budget", budget);
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
              to="/transaction"
              className="btn btn-dark"
              value="Transaction"
            >
              Transaction
            </NavLink>
            <NavLink to="/stat" className="btn btn-dark" value="Statistics">
              Statistics
            </NavLink>
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
          <div>
            <Routes>
              <Route path="/addBudget" element={<AddBudget />} />
              <Route
                path="/transaction"
                element={
                  <Transaction
                    user={props.username}
                    refreshPage={props.refreshPage}
                  />
                }
              />
            </Routes>
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
    console.log("getBalanceAndBudget success", data);
    const balance = await data.balance;
    const budget = await data.budget;
    return [balance, budget];
  } else if (res.status === 404) {
    return ["0", "0"];
  }
}
