import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import Badge from "react-bootstrap/Badge";
import DateTimePicker from "react-datetime-picker";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import _uniqueId from "lodash/uniqueId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    fetch("/createTransaction", {
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
          props.toggle();
          props.refreshPage();
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
 * TransactionRecord is a component that shows a exisiting transaction.
 */
function TransactionRecord(props) {
  function parseDate(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0] + " " + date.toDateString();
  }

  function deleteTransaction() {
    if (window.confirm("Are you sure to delete this transaction?")) {
      fetch("/deleteTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.id }),
      })
        .then((resRaw) => {
          if (!resRaw.ok) {
            resRaw.text().then((res) => {
              alert(res);
            });
          } else {
            props.refreshPage();
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
          ${props.amount}
          <TiDelete size="1.5em" onClick={deleteTransaction} />
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
 * TransactionList is a component that shows all transactions.
 */
function TransactionList(props) {
  return (
    <div className="flex-container d-flex flex-column">
      <div className="flex-grow-1 d-flex flex-column">
        <div className="my-3 mx-2 text-center flex-grow-1">
          <ul className="flex-container list-group list-group-flush d-flex justify-content-evenly">
            {props.list.map((i, index) => (
              <TransactionRecord
                key={"RecentTransaction-" + index}
                id={i.id}
                category={i.category}
                amount={parseFloat(i.amount)}
                date={i.date}
                merchant={i.merchant}
                refreshPage={props.refreshPage}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Transaction(props) {
  const [showNewTrans, setShowNewTrans] = useState(false);
  const [list, setList] = useState([]);

  function toggleSelectionPanelContent() {
    setShowNewTrans(!showNewTrans);
  }

  useEffect(() => {
    fetch("/allTransactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="border-end flex-container d-flex flex-column">
      <div
        className="text-center border-bottom py-3 position-relative"
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        Transactions
        {showNewTrans ? null : (
          <div
            className="position-absolute top-50 translate-middle-y new-btn"
            onClick={toggleSelectionPanelContent}
          >
            <FontAwesomeIcon icon={["fas", "plus"]} />
          </div>
        )}
      </div>
      <div className="flex-grow-1" id="panel_content">
        {showNewTrans ? (
          <NewTransaction
            user={props.user}
            toggle={toggleSelectionPanelContent}
            refreshPage={props.refreshPage}
          />
        ) : (
          <TransactionList list={props.list} refreshPage={props.refreshPage} />
        )}
      </div>
    </div>
  );
}
