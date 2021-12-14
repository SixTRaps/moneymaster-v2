import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";

/* This is a basic layout component containing a navbar 
   and a sidebar. */
export default function BasicLayout({ children }) {
  return (
    <div className="basicLayout">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="brand">
            <img
              src={logo}
              alt="moneyMaster logo"
              width="40"
              height="40"
              className="d-inline-block"
            />{" "}
            MONEY MASTER{" "}
          </NavLink>
        </div>
        <form
          action="/api/logout?_method=DELETE"
          method="POST"
          className="ms-auto"
        >
          <button className="custom-btn-navbar" type="submit">
            LOG OUT
          </button>
        </form>
      </nav>
      <div className="row" role="main">
        <div className="col-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-10">{children}</div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div>
      <NavLink to="/dashboard" className="sidebar-btn">
        Dashboard
      </NavLink>
      <NavLink to="/showTransactions" className="sidebar-btn">
        All Trans
      </NavLink>
      <NavLink to="/newTransaction" className="sidebar-btn">
        New Trans
      </NavLink>
      <NavLink to="/statistics" className="sidebar-btn">
        Statistics
      </NavLink>
    </div>
  );
}
