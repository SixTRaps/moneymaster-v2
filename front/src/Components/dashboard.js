import React from "react";
import { useState, useEffect } from "react";
import BasicLayout from "./basicLayout.js";
import dashboardPic from "../images/dashboard-pic.png";
import AddBudget from "./addBudget.js";

/* This is the dashboard component. It displays user's current
   balance and budget values. */
export default function Dashboard(props) {
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function lookup() {
      const data = await getBalanceAndBudget();
      if (data) {
        setBalance(parseFloat(data[0]).toFixed(2));
        setBudget(parseFloat(data[1]).toFixed(2));
      }
    }
    lookup();
  }, [balance, budget]);

  return (
    <BasicLayout>
      <div className="dashboard d-flex align-items-center flex-column justify-content-center">
        {props.username === undefined ? (
          <h2>Welcome to the Money Master, visitor!</h2>
        ) : (
          <h2>Welcome to the Money Master, {props.username}!</h2>
        )}
        <div className="d-flex align-items-center flex-column justify-content-center">
          <h3>Balance/Budget</h3>
          <h3>
            {balance}/{budget}
          </h3>
        </div>
        <AddBudget />
        <br />
        <img src={dashboardPic} alt="dashboard pic" />
      </div>
    </BasicLayout>
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
