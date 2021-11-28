import React from "react";
import { useState } from "react";

export default function Signin() {
  const [budget, setBudget] = useState(0);

  async function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      budget: budget,
    };
    fetch("/api/startOver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    window.location.href = "/";
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
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
