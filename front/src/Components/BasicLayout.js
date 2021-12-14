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
        <button className="custom-btn-navbar" onClick={handleShow}>
          Instructions
        </button>
        <Modal className="instructions" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Guidelines</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Dashboard Page:</h4>
            <div>
              This page serves as a dashboard to show your current remaining
              balance and budget for this circle. Please set up your initial
              budget at the begining of the new circle. To create or reset a new
              budget, please input the value and click the "Start Over" button.
              Remember it will clear all the records. If you want to keep all
              history records but just change the budget, please use the "Edit"
              button.
            </div>
            <h4>All Transactions Page:</h4>
            <div>
              You can view all of your transactions here with all details of the
              transaction: category, merchant name, amount, notes and date
              information. Also, you can delete the transaction if you didn't
              make it.
            </div>
            <h4>New Transaction Page:</h4>
            <div>
              You can create a new transaction here. Feel free to input the
              category, merchant name, amount, note and date to create a new
              transaction.
            </div>
            <h4>Statistics Page:</h4>
            <div>
              You can view statistical pie charts created according to the
              transactions you created. It will help analyze your expense/
              balance and expense category in this circle.
            </div>
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
