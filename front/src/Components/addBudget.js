import React from "react";
import { useState } from "react";

export default function Signin() {
  const [budget, setBudget] = useState(0);

  async function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      budget: budget,
    };
    console.log("chang!");
    const res = await fetch("/api/changeBudget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);

    window.location.href = "/dashboard";
  }

  return (
    <div className="container auth">
      <form className="form d-flex flex-column" onSubmit={onSubmit}>
        <p className="d-flex justify-content-center">
          Please enter your budget below
        </p>
        <label className="d-flex justify-content-center">
          New Budget:
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
