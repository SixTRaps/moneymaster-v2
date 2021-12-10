import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";

/* This is a basic layout component containing a navbar 
   and a sidebar. */
export default function BasicLayout({ children }) {
  return (
    <div className="basicLayout">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <NavLink to="/showTransactions">
            <img
              src={logo}
              alt="moneyMaster logo"
              width="40"
              height="40"
              className="d-inline-block"
            />
          </NavLink>
          <span className="brand">MONEY MASTER</span>
        </div>
        <form
          action="/api/logout?_method=DELETE"
          method="POST"
          className="ms-auto"
        >
          <button className="btn btn-warning" type="submit">
            LOG OUT
          </button>
        </form>
      </nav>
      <div className="row">
        <div className="col-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-10">{children}</div>
      </div>
    </div>
  );
}

function Sidebar() {
  const [values, setValues] = useState({ budget: 0, balance: 0 });
  const [mount, setMount] = useState(false);
  let budgetMonitor = 0;

  useEffect(() => {
    async function lookup() {
      if (!mount) {
        setMount(true);
        const before = new Date();

        const data = await getBalanceAndBudget();
        console.log("After getting budget ", new Date() - before);
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
      }
    }
    lookup();
  }, [mount, values]);

  async function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      budget: budgetMonitor,
    };
    const res = await fetch("/api/startOver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 400) {
      alert("Updating budget failed. Please refresh your page.");
    } else if (res.status === 401) {
      alert("Authentication required. Please sign in first.");
    }
    setValues({ ...values, budget: budgetMonitor });
  }

  return (
    <div>
      <div className="budget-modification">
        <h3 className="d-flex justify-content-center">Balance/Budget</h3>
        <h3 className="d-flex justify-content-center">
          ${values.balance}/${values.budget}
        </h3>
        <form className="form" onSubmit={onSubmit}>
          <h4 className="d-flex justify-content-center">Reset Budget:</h4>
          <label className="d-flex justify-content-center">
            <input
              type="number"
              required={true}
              onChange={(e) => {
                budgetMonitor = e.target.value;
              }}
            />
          </label>
          <div className="submit-btn d-flex justify-content-center">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <NavLink to="/showTransactions" className="sidebar-btn">
        All Transactions
      </NavLink>
      <NavLink to="/newTransaction" className="sidebar-btn">
        New Transaction
      </NavLink>
      <NavLink to="/statistics" className="sidebar-btn">
        Statistics
      </NavLink>
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
    return [0, 0];
  }
}
