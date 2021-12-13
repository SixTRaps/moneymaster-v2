import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import InputBox from "./InputBox.js";

/**
 * CreateTransaction is a component to submit a new transaction form.
 */
export default function CreateTransaction() {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("housing");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [msg, setMsg] = useState("");

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
            setMsg(res);
          });
        } else {
          setMsg("New transaction created");
          window.location.href = "/showTransactions";
        }
      })
      .catch((err) => {
        setMsg(err);
      });
  }

  return (
    <div className="flex-container">
      <form
        onSubmit={handleSubmit}
        className="flex-container d-flex flex-column"
      >
        <p>{msg}</p>
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
          <button className="btn" id="custom-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
