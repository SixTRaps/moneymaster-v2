import React, { useState, useEffect } from "react";
import DataPie from "./pie";
import BasicLayout from "./basicLayout.js";

/* This is the Statistics component that display pie charts
   to the user regarding their datas. */
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
      value: parseFloat(balance).toFixed(2),
      color: "hsl(25, 70%, 50%)",
    },
    {
      id: "Budget",
      label: "Budget",
      value: parseFloat(budget).toFixed(2),
      color: "hsl(320, 70%, 50%)",
    },
  ];

  function typeData(type) {
    if (Object.keys(type).length === 0) return [];
    const data = [];
    Object.keys(type).forEach((item) => {
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
    <BasicLayout>
      <div className="view-port container">
        <div className="d-flex flex-column">
          <div className="row">
            <div
              style={{ height: "calc(100vh - 6rem)" }}
              className="col-6 px-0"
            >
              <div className="pie-title">Balance/Budget</div>
              <div
                className="d-flex justify-content-center me-2"
                style={{ height: "60%" }}
              >
                <div className="flex-container" style={{ width: "90%" }}>
                  <DataPie data={balance_data} />
                </div>
              </div>
            </div>
            <div
              style={{ height: "calc(100vh - 6rem)" }}
              className="col-6 px-0"
            >
              <div className="pie-title">Expense Category</div>
              <div
                className="d-flex justify-content-center me-2"
                style={{ height: "60%" }}
              >
                <div className="flex-container" style={{ width: "90%" }}>
                  <DataPie data={typeData(props.expense)} />
                </div>
              </div>
            </div>
          </div>
        </div>
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
