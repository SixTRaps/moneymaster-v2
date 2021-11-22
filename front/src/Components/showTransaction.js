import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import _uniqueId from "lodash/uniqueId";
import { FontAwesomeIcon } from "react-fontawesome";

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
      fetch("/api/deleteTransaction", {
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
            const array = _.cloneDeep(props.list);
            for (let i = 0; i < array.length; i++) {
              if (array[i].id === props.id) {
                array.splice(i, 1);
              }
            }
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
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getTransactions() {
      const transactions = await fetch("/api/allTransactions", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await transactions.json();
      if (res) {
        const data = [];
        for (const d of res) {
          data.push(d);
        }
        setList(data);
      }
    }
    getTransactions();
  });

  return (
    <div className="flex-container d-flex flex-column">
      <div className="flex-grow-1 d-flex flex-column">
        <div className="my-3 mx-2 text-center flex-grow-1">
          <ul className="flex-container list-group list-group-flush d-flex justify-content-evenly">
            {list.map((i, index) => (
              <TransactionRecord
                key={"Transaction-" + index}
                id={i.id}
                category={i.category}
                amount={parseFloat(i.amount)}
                date={i.date}
                merchant={i.merchant}
                note={i.note}
                list={list}
                // setList={props.setList}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ShowTransaction(props) {
  return (
    <div className="border-end flex-container d-flex flex-column">
      <div
        className="text-center border-bottom py-3 position-relative"
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        Show All Transactions
      </div>
      <div className="flex-grow-1" id="panel_content">
        <TransactionList />
      </div>
    </div>
  );
}
