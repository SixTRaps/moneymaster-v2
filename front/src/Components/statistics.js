import React, { useState, useEffect } from "react";
import DataPie from "./pie";

export default function Statistics(props) {
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

  const balance_data = [
    {
      id: "Balance",
      label: "Balance",
      value: balance,
      color: "hsl(25, 70%, 50%)",
    },
    {
      id: "Budget",
      label: "Budget",
      value: budget,
      color: "hsl(320, 70%, 50%)",
    },
  ];

  function typeData(type) {
    if (Object.keys(type).length === 0) return [];
    const data = [];
    Object.keys(type).map((item) => {
      const object = {};
      const r = (Math.random() * 255).toFixed(0);
      const g = (Math.random() * 255).toFixed(0);
      const b = (Math.random() * 255).toFixed(0);
      let value = 0;
      type[item].map((item) => (value += item.amount));

      object["value"] = parseFloat(value).toFixed(2);
      object["id"] = item;
      object["label"] = item;
      object["color"] = `rgb(${r}, ${g}, ${b})`;
      data.push(object);
    });

    return data;
  }

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <div className="flex-grow-1">
        <div className="row flex-container">
          <div style={{ height: "calc(100vh - 6rem)" }} className="col-6 px-0">
            <button className="btn btn-secondary">
              Show Balance/Budget Pie
            </button>
            <div
              className="d-flex justify-content-center me-2"
              style={{ height: "80%" }}
            >
              <div className="flex-container" style={{ width: "90%" }}>
                <DataPie data={balance_data} />
              </div>
            </div>
          </div>
          <div style={{ height: "calc(100vh - 6rem)" }} className="col-6 px-0">
            <button className="btn btn-secondary">
              Show Expense Category Pie
            </button>
            <div
              className="d-flex justify-content-center me-2"
              style={{ height: "80%" }}
            >
              <div className="flex-container" style={{ width: "90%" }}>
                <DataPie data={typeData(props.expense)} />
              </div>
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