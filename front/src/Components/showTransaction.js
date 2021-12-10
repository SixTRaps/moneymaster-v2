import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import BasicLayout from "./basicLayout.js";

/**
 * TransactionRecord is a component that shows a exisiting transaction.
 */
function TransactionRecord(props) {
  function parseDate(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0] + " " + date.toDateString();
  }

  function deleteTransaction() {
    if (window.confirm("Be sure to delete this transaction?")) {
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
            props.setList(array);
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
          <TiDelete
            className="delete-icon"
            size="1.5em"
            onClick={deleteTransaction}
          />
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
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(props.list.length / 5);

  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div className="flex-container d-flex flex-column">
      <div className="flex-grow-1 d-flex flex-column">
        <div className="my-3 mx-2 text-center flex-grow-1">
          <ul className="flex-container list-group list-group-flush d-flex justify-content-evenly">
            {props.list.slice(page * 5 - 5, page * 5).map((i, index) => (
              <TransactionRecord
                key={"Transaction-" + index}
                id={i.id}
                category={i.category}
                amount={parseFloat(i.amount)}
                date={i.date}
                merchant={i.merchant}
                note={i.note}
                list={props.list}
                setList={props.setList}
              />
            ))}
          </ul>
          <div
            className="row btn-group d-flex justify-content-center"
            role="group"
            aria-label="page navigation button"
          >
            <button
              className="col-3 btn btn-secondary"
              onClick={prevPage}
              style={{ height: "10%" }}
            >
              Prev
            </button>
            <div className="col-6 text-center">
              Page {page}/{totalPages}
            </div>
            <button
              className="col-3 btn btn-secondary"
              onClick={nextPage}
              style={{ height: "10%" }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowTransaction(props) {
  return (
    <BasicLayout>
      <div className="view-port container d-flex flex-column">
        <div
          className="text-center py-3 position-relative"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          <h3 className="border-bottom">Show All Transactions</h3>
        </div>
        <div className="flex-grow-1" id="panel_content">
          <TransactionList list={props.list} setList={props.setList} />
        </div>
      </div>
    </BasicLayout>
  );
}
