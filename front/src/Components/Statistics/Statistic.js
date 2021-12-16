import React, { useState, useEffect } from "react";
import DataPie from "./Pie.js";
import BasicLayout from "../BasicLayout.js";

/* This is the Statistics component that display pie charts
   to the user regarding their datas. */
export default function Statistics() {
  const [list, setList] = useState([]);
  const [expense, setExpense] = useState({});
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [unCheck, setUnCheck] = useState(true);
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch("/api/allTransactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res);
      });
  }, []);

  useEffect(() => {
     // I feel that const declarations like this should be extracted outside, so you can prevent redeclaring of this array.
    const categories = [
      "housing",
      "transportation",
      "consumables",
      "livingExpense",
      "savings",
      "debt",
    ];
    for (let category of categories) {
      const array = list.filter((item) => item.category === category);
      if (array.length === 0) continue;
      setExpense((prev) => ({ ...prev, [category]: array }));
    }
  }, [list]);

  useEffect(() => {
    async function lookup() {
      const data = await getBalanceAndBudget();
      if (unCheck && data) {
        setUnCheck(false);
        setBalance(parseFloat(data[0]).toFixed(2));
        setBudget(parseFloat(data[1]).toFixed(2));
      }
    }
    lookup();
  }, [unCheck, balance, budget]);

  const balance_data = [
    {
      id: "Expense",
      label: "Expense",
      value: (parseFloat(budget) - parseFloat(balance)).toFixed(2),
      color: "hsl(320, 70%, 50%)",
    },
    {
      id: "Balance",
      label: "Balance",
      value: parseFloat(balance).toFixed(2),
      color: "hsl(25, 70%, 50%)",
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
      type[item].map((item) => (value += parseFloat(item.amount))); 
       // I might be misunderstanding, but I think a forEach loop may be better here since you are not returning anything

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
      <div className="view-port container d-flex flex-column">
        <div
          className="text-center border-bottom py-3 position-relative"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          <h1>Statistics Analyzation</h1>
          <div style={{ height: "calc(100vh - 6rem)" }}>
            <div
              className="d-flex justify-content-evenly"
              role="group"
              aria-label="pie category"
            >
              <button
                className="custom-btn"
                onClick={() => {
                  setContent(balance_data);
                }}
                style={{ width: "25%", height: "40%" }}
              >
                Show Expense/ Balance Pie
              </button>
              <button
                className="custom-btn"
                onClick={() => {
                  setContent(() => typeData(expense));
                }}
                style={{ width: "25%", height: "40%" }}
              >
                Show Expense Category Pie
              </button>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ height: "55%" }}
              aria-hidden="true"
            >
              <DataPie data={content} />
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
    return [0, 0];
  }
}
