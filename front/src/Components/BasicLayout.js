import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";
import { Button, Modal } from "react-bootstrap";

/* This is a basic layout component containing a navbar 
   and a sidebar. */
export default function BasicLayout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
        <Button id="custom-btn-navbar" onClick={handleShow}>
          Instructions
        </Button>
        <Modal className="instructions" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Guidelines</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>
              1. Please start by submitting your budget. To create a new budget,
              enter the value and click the "Submit" button.
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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <form
          action="/api/logout?_method=DELETE"
          method="POST"
          className="ms-auto"
        >
          <button className="btn" id="custom-btn-navbar" type="submit">
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
  return (
    <div>
      <NavLink to="/dashboard" className="sidebar-btn">
        Dashboard
      </NavLink>
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
