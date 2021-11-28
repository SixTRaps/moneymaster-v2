import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";

/* This is a basic layout component containing a navbar 
   and a sidebar. */
export default function BasicLayout({ children }) {
  return (
    <div className="basicLayout">
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <NavLink to="/">
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
          <NavLink to="/newTransaction" className="sidebar-btn">
            New Transaction
          </NavLink>
          <NavLink to="/showTransactions" className="sidebar-btn">
            All Transactions
          </NavLink>
          <NavLink to="/statistics" className="sidebar-btn">
            Statistics
          </NavLink>
        </div>
        <div className="col-10">{children}</div>
      </div>
    </div>
  );
}
