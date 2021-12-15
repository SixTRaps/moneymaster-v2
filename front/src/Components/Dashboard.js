import React from "react";
import { useState, useEffect } from "react";
import BasicLayout from "./BasicLayout.js";
import dashboardBottom from "../images/dashboard-bottom.jpg";
import Modal from "react-modal";

/* This is the dashboard component. It displays user's current
   balance and budget values. */
export default function Dashboard() {
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [mount, setMount] = useState(false);
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  let budgetMonitor = 0;

  useEffect(() => {
    async function lookup() {
      if (!mount) {
        setMsg("Loading data...");
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
            setMsg("");
          }
        }
        setMsg("");
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
            <button className="instruction-button" onClick={handleShow}>
              Instructions
            </button>
            <Modal
              className="instruction-modal"
              isOpen={showModal}
              onRequestClose={handleClose}
              contentLabel="Instructions Modal"
              ariaHideApp={false}
            >
              <button onClick={handleClose}> Close </button>
              <p className="instructions-title">Dashboard Page:</p>
              <p>
                This page serves as a dashboard to show your current remaining
                balance and budget for this circle. Please set up your initial
                budget at the begining of the new circle. To create or reset a
                new budget, please input the value and click the "Start Over"
                button. Remember it will clear all the records. If you want to
                keep all history records but just change the budget, please use
                the "Edit" button.
              </p>
              <p className="instructions-title">All Transactions Page:</p>
              <p>
                You can view all of your transactions here with all details of
                the transaction: category, merchant name, amount, notes and date
                information. Also, you can delete the transaction if you didn't
                make it.
              </p>
              <p className="instructions-title">New Transaction Page:</p>
              <p>
                You can create a new transaction here. Feel free to input the
                category, merchant name, amount, note and date to create a new
                transaction.
              </p>
              <p className="instructions-title">Statistics Page:</p>
              <p>
                You can view statistical pie charts created according to the
                transactions you created. It will help analyze your expense/
                balance and expense category in this circle.
              </p>
            </Modal>
            <h1>Welcome to the Money Master!</h1>
            <h2>Please set up your budget first</h2>
            <p>{msg}</p>
            <h3>Remaining Balance: ${balance}</h3>
            <h3>Budget: ${budget}</h3>
            <div className="d-flex justify-content-evenly">
              <form className="form d-flex flex-column" onSubmit={onSubmitEdit}>
                <label
                  className="d-flex justify-content-center"
                  aria-label="new budget value"
                >
                  <input
                    type="number"
                    onChange={(e) => {
                      budgetMonitor = e.target.value;
                    }}
                    required={true}
                  />
                </label>
                <br />
                <div className="d-flex justify-content-evenly">
                  <button className="custom-btn-budget" type="submit">
                    Edit
                  </button>
                  <button className="custom-btn-budget" onClick={onSubmit}>
                    Start Over
                  </button>
                </div>
              </form>
            </div>
            <img src={dashboardBottom} alt="dashboard bottom" />
            <div id="pic-credit">
              Image by <p className="space">s</p>
              <a href="https://www.freepik.com/">Freepik</a>
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
