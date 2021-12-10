import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";

const DEBUG = process.env.DEBUG || false;

/* This is a basic layout component containing a navbar 
   and a sidebar. */
export default function BasicLayout({ children }) {
  return (
    <div className="basicLayout">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <NavLink to="/dashboard">
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
  useEffect(() => {
    fetch("./api/getBalanceAndBudget", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setValues(res);
      });
  }, []);

  return (
    <div>
      <div className="budget-modification">
        <h3 className="d-flex justify-content-center">Balance/Budget</h3>
        <h3 className="d-flex justify-content-center">
          ${values.balance}/${values.budget}
        </h3>
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
