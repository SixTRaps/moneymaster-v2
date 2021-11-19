import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import Badge from "react-bootstrap/Badge";
import DateTimePicker from "react-datetime-picker";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import _uniqueId from "lodash/uniqueId";

/**
 * Transaction is a component that represents a actual expense record.
 */
function Transaction(props) {
  function parseDate(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0] + " " + date.toDateString();
  }

  function deleteTransaction() {
    if (confirm("Are you sure to delete this transaction?")) {
      fetch("/transaction/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: props._id }),
      })
        .then((resRaw) => {
          if (!resRaw.ok) {
            resRaw.text().then((res) => {
              alert(res);
            });
          } else {
            const array = _.cloneDeep(props.recent);
            for (let i = 0; i < array.length; i++) {
              if (array[i]._id === props._id) {
                array.splice(i, 1);
              }
            }
            props.setRecent(array);
            props.refreshPage((prev) => !prev);
            console.log("Transaction deleted");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="mb-3 position-relative">
      <li
        className="list-group-item d-flex justify-content-between align-item-center list-group-item-light"
        style={{ fontWeight: "bold" }}
      >
        {(props.note ? props.category + ": " : "") + props.merchant}
        <div>
          <Badge pill variant={props.type === "Expense" ? "danger" : "primary"}>
            ${props.amount}
          </Badge>{" "}
          {props.refreshPage !== undefined ? (
            <TiDelete size="1.5em" onClick={deleteTransaction} />
          ) : null}
        </div>
      </li>
      <li
        className="list-group-item d-flex justify-content-between align-item-center list-group-item-light"
        style={{ fontSize: "15px" }}
      >
        {props.note ? props.note : props.category}
        <div style={{ fontStyle: "italic" }}>{parseDate(props.date)}</div>
      </li>
    </div>
  );
}

/**
 * InputBox is a component that represents a input and label.
 */
function InputBox(props) {
  const [id] = useState(_uniqueId("input-"));

  return (
    <div className="form-floating my-3">
      <input
        type={props.type === undefined ? "text" : props.type}
        className="form-control"
        id={id}
        value={props.value}
        onChange={props.onChange}
        placeholder={""}
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
 * NewTransaction is a component that creates a new expense transaction.
 */
export function NewTransaction(props) {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState(props.user.categories);
  const [category, setCategory] = useState(props.user.categories[0]);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    const data = {
      category: category,
      merchant: merchant,
      amount: amount,
      date: date.getTime(),
      note: note,
    };
    fetch("/transaction/new", {
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
          const newDateRange = _.cloneDeep(props.dateRange);
          newDateRange[1] = new Date();
          props.setDateRange(newDateRange);
          props.toggle();
          props.refreshPage((prev) => !prev);
          console.log("New transaction created");
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
        <div className="row py-3 text-center btn-group mx-3" role="group">
          <div
            className="col-3 border-end btn btn-secondary"
            onClick={props.toggle}
          >
            Cancel
          </div>
          <div className="col-3 border-end btn btn-secondary">Expense</div>
          <button className="col-3 btn btn-secondary">Save</button>
        </div>
        <div className="text-center my-3">
          <DateTimePicker onChange={setDate} value={date} clearIcon={null} />
        </div>
        <div className="form-floating my-3">
          <select
            className="form-select"
            id="select"
            value={category}
            onChange={(evt) => {
              setCategory(evt.target.value);
            }}
          >
            {categories.map((item, index) => (
              <option value={item} key={"option-" + index}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="select">Category</label>
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
      </form>
    </div>
  );
}

/**
 * TransactionList is a component that represents a group of transactions.
 */
export function TransactionList(props) {
  return (
    <div className="Transaction-item">
      <h2 className="Transaction-header">
        <button
          className="Transaction-button collapsed fw-bold text-black-50"
          data-bs-toggle="collapse"
          data-bs-target={"#" + props.header.replace(/\s+/g, "")}
        >
          {props.header}
        </button>
      </h2>
      <div
        id={props.header.replace(/\s+/g, "")}
        className="Transaction-collapse collapse"
      >
        <div className="Transaction-body">
          {props.transactions.map((i, index) => (
            <Transaction
              key={"Transaction-" + index}
              _id={i._id}
              category={i.category}
              amount={parseFloat(i.amount)}
              date={i.date}
              merchant={i.merchant}
              type={i.type}
              recent={props.recent}
              setRecent={props.setRecent}
              refreshPage={props.refreshPage}
              note={i.note}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
