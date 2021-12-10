import React from "react";
import { useState, useEffect } from "react";

/* This is the EditBudget component that enables user to change or reset
   their budget value. */
export default function EditBudget() {
  const [budget, setBudget] = useState(0);
  const [value, setValue] = useState(0);

  async function setSubmit(evt) {
    evt.preventDefault();
    if (
      window.confirm(
        "Be sure to start over? By confirming you will lose all your previous transaction records."
      )
    ) {
      const data = {
        budget: budget,
      };
      const res = await fetch("/api/resetBudget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        alert("Updating budget failed. Please refresh your page.");
      } else if (res.status === 401) {
        alert("Authentication required. Please sign in first.");
      }
      window.location.href = "/dashboard";
    }
  }

  async function changeSubmit(evt) {
    evt.preventDefault();
    const data = {
      budget: value,
    };
    const res = await fetch("/api/editBudget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 400) {
      alert("Updating budget failed. Please refresh your page.");
    } else if (res.status === 401) {
      alert("Authentication required. Please sign in first.");
    }
    window.location.href = "/dashboard";
  }

  return (
    <div className="container auth">
      <form className="form d-flex flex-column" onSubmit={setSubmit}>
        <h4 className="d-flex justify-content-center">
          Start over from budget:
        </h4>
        <label className="d-flex justify-content-center">
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required={true}
          />
        </label>
        <br />
        <div className="submit-btn d-flex justify-content-center">
          <button className="btn btn-dark" type="submit">
            Reset
          </button>
        </div>
      </form>
      <form className="form" onSubmit={changeSubmit}>
        <h4 className="d-flex justify-content-center">Change Budget:</h4>
        <label className="d-flex justify-content-center">
          <input
            type="number"
            required={true}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <div className="submit-btn d-flex justify-content-center">
          <button className="btn btn-dark" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
