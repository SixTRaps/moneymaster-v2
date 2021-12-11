import React from "react";
import { useState, useEffect } from "react";
import BasicLayout from "./BasicLayout.js";
import dashboardPic from "../images/dashboard-pic.png";
import { Button, Modal } from "react-bootstrap";

/* This is the dashboard component. It displays user's current
   balance and budget values. */
export default function Dashboard() {
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [mount, setMount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  let budgetMonitor = 0;

  useEffect(() => {
    async function lookup() {
      if (!mount) {
        setMount(true);
        const data = await getBalanceAndBudget();
        if (data) {
          const curBudget = parseFloat(data[1]).toFixed(2);
          const curBalance = parseFloat(data[0]).toFixed(2);

          if (
            parseFloat(data[0]).toFixed(2) !== parseFloat(budget).toFixed(2)
          ) {
            setBudget(curBudget);
            setBalance(curBalance);
          }
        }
      }
    }
    lookup();
  }, [mount, budget, balance]);

  async function onSubmit(evt) {
    evt.preventDefault();
    if (
      window.confirm(
        "Be sure to start over? By confirming you will lose all your previous transaction records."
      )
    ) {
      const data = {
        budget: budgetMonitor,
      };
      const res = await fetch("/api/startOver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        setMsg("Start over budget failed. Please refresh your page.");
      } else if (res.status === 401) {
        setMsg("Authentication required. Please sign in first.");
      }
      setBudget(budgetMonitor);
      setBalance(budgetMonitor);
    }
  }

  async function onSubmitEdit(evt) {
    evt.preventDefault();
    const data = {
      budget: budgetMonitor,
    };
    const res = await fetch("/api/updateBudget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 400) {
      setMsg("Updating budget failed. Please refresh your page.");
    } else if (res.status === 401) {
      setMsg("Authentication required. Please sign in first.");
    }
    setMsg("Updating...");
    const updateData = await getBalanceAndBudget();
    if (updateData) {
      const curBudget = parseFloat(updateData[1]).toFixed(2);
      const curBalance = parseFloat(updateData[0]).toFixed(2);

      if (
        parseFloat(updateData[0]).toFixed(2) !== parseFloat(budget).toFixed(2)
      ) {
        setBudget(curBudget);
        setBalance(curBalance);
      }
    }
    setMsg("");
  }

  return (
    <BasicLayout>
      <div className="dashboard d-flex align-items-center flex-column justify-content-center">
        <div>
          <div className="d-flex align-items-center flex-column justify-content-center">
            <Button onClick={handleShow}>Instructions</Button>
            <Modal
              className="instructions"
              show={showModal}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>Guidelines</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                  4. You can view statistical pie charts created according to
                  your transactions by clicking the "Statistics" button in the
                  left sidebar.
                </h4>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
            <p>{msg}</p>
            <h3>Remaining Balance: ${balance}</h3>
            <h3>Budget: ${budget}</h3>
            <form className="form d-flex flex-column" onSubmit={onSubmitEdit}>
              <h4 className="d-flex justify-content-center">
                Change the budget:
              </h4>
              <label className="d-flex justify-content-center">
                <input
                  type="number"
                  onChange={(e) => {
                    budgetMonitor = e.target.value;
                  }}
                  required={true}
                />
              </label>
              <br />
              <div className="submit-btn d-flex justify-content-center">
                <button className="btn btn-dark" type="submit">
                  Edit
                </button>
              </div>
            </form>
            <form className="form d-flex flex-column" onSubmit={onSubmit}>
              <div className="submit-btn d-flex justify-content-center">
                <button className="btn btn-dark" type="submit">
                  Start Over
                </button>
              </div>
            </form>
          </div>
        </div>
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
