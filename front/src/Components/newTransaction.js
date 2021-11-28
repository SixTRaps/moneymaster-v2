import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import _uniqueId from "lodash/uniqueId";
import BasicLayout from "./basicLayout.js";

/**
 * InputBox is a component that represents a input and label to create a new transaction.
 */
function InputBox(props) {
  const [id] = useState(_uniqueId("input-"));

  return (
    <div className="form-floating my-3">
      <input
        className="form-control"
        id={id}
        value={props.value}
        onChange={props.onChange}
        placeholder={""}
        type={props.type}
        required={props.required || false}
      />
      <label htmlFor={id}>{props.label}</label>
      <div
        className={
          "invalid-feedback" + (props.feedback === undefined ? " d-none" : "")
        }
      >
        {props.feedback}
      </div>
    </div>
  );
}

/**
 * CreateTransaction is a component to submit a new transaction form.
 */
function CreateTransaction(props) {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("housing");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = {
      category: category,
      merchant: merchant,
      amount: amount,
      date: date.getTime(),
      note: note,
    };
    fetch("/api/createTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resRaw) => {
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          alert("New transaction created");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="flex-container">
      <form
        onSubmit={handleSubmit}
        className="flex-container d-flex flex-column"
      >
        <div className="text-center my-3">
          <DateTimePicker onChange={setDate} value={date} clearIcon={null} />
        </div>
        <label htmlFor="select">Category</label>
        <div className="form-floating">
          <select
            name="Category"
            id="cate"
            onChange={(evt) => setCategory(evt.target.value)}
            required={true}
            feedback="Please choose from one of the categories"
          >
            <option value="housing">Housing</option>
            <option value="transportation">Transportation</option>
            <option value="consumables">Consumables</option>
            <option value="livingExpense">Living Expense</option>
            <option value="savings">Savings</option>
            <option value="debt">Debt</option>
          </select>
        </div>
        <InputBox
          label="Merchant name"
          value={merchant}
          onChange={(evt) => setMerchant(evt.target.value)}
          required={true}
          feedback="Please enter the merchant name"
        />
        <InputBox
          label="Amount"
          value={amount}
          type="number"
          onChange={(evt) => setAmount(evt.target.value)}
          required={true}
        />
        <div className="form-floating mt-3 mb-5 flex-grow-1">
          <textarea
            id="note"
            value={note}
            className="form-control"
            placeholder="textarea"
            onChange={(evt) => setNote(evt.target.value)}
            style={{ height: "100%" }}
          />
          <label htmlFor="note">Note</label>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-warning" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * NewTransaction is a component that creates a new expense transaction.
 */
export default function NewTransaction(props) {
  return (
    <BasicLayout>
      <div className="view-port container d-flex flex-column">
        <div
          className="text-center border-bottom py-3 position-relative"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          <h3>Create New Transactions</h3>
        </div>
        <div className="flex-grow-1" id="panel_content">
          <CreateTransaction user={props.user} />
        </div>
      </div>
    </BasicLayout>
  );
}
