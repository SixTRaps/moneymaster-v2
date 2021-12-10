import React from "react";
import { useState, useEffect } from "react";
import BasicLayout from "./BasicLayout.js";
import dashboardPic from "../images/dashboard-pic.png";
import EditBudget from "./EditBudget.js";

/* This is the dashboard component. It displays user's current
   balance and budget values. */
export default function Dashboard(props) {
  const [values, setValues] = useState({ budget: 0, balance: 0 });
  const [mount, setMount] = useState(false);

  useEffect(() => {
    async function lookup() {
      if (!mount) {
        setMount(true);
        const data = await getBalanceAndBudget();
        if (data) {
          const curBudget = parseFloat(data[1]).toFixed(2);
          const curBalance = parseFloat(data[0]).toFixed(2);

          if (
            parseFloat(data[0]).toFixed(2) !==
            parseFloat(values.budget).toFixed(2)
          ) {
            setValues({ budget: curBudget, balance: curBalance });
          }
        }
        console.log("running lookup");
      }
    }
    lookup();
  }, [mount, values]);

  return (
    <BasicLayout>
      <div className="dashboard d-flex align-items-center flex-column justify-content-center">
        {/*   {props.username === undefined ? (
          <h2>Welcome to the Money Master, visitor!</h2>
        ) : (
          <h2>Welcome to the Money Master, {props.username}!</h2>
        )}*/}
        <div>
          <div className="d-flex align-items-center flex-column justify-content-center">
            <div className="instructions">
              <h4>Guidelines</h4>
              <h4>
                1. Please start by submitting your budget. To create a new
                budget, enter the value and click the "Submit" button.
              </h4>
              <h4>
                2. You can create new transaction record by clicking the "New
                Transaction" button in the left sidebar.
              </h4>
              <h4>
                3. You can view all of your transactions by clicking the "All
                Transactions" button in the left sidebar.
              </h4>
              <h4>
                4. You can view statistical pie charts created according to your
                transactions by clicking the "Statistics" button in the left
                sidebar.
              </h4>
            </div>
            <h3>Balance/Budget</h3>
            <h3>
              ${values.balance}/${values.budget}
            </h3>
          </div>
        </div>
        <EditBudget />
        <br />
        <img src={dashboardPic} alt="dashboard pic" />
        <p>The image is retrieved from www.freepik.com</p>
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
