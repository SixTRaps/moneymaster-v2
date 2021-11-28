import React from "react";
import { useState } from "react";

/* This is the AddBudget component that enables user to change
   their budget value. */
export default function AddBudget() {
  const [budget, setBudget] = useState(0);

  async function onSubmit(evt) {
    evt.preventDefault();
    if (
      window.confirm(
        "Be sure to start over? By confirming you will lose all your previous transaction records."
      )
    ) {
      const data = {
        budget: budget,
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
      window.location.href = "/";
    }
  }

  return (
    <div className="container auth">
      <form className="form d-flex flex-column" onSubmit={onSubmit}>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
