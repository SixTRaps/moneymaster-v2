import React from "react";
import { TiDelete } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import propTypes from "prop-types";

/**
 * TransactionRecord is a component that shows a exisiting transaction.
 */
export default function TransactionRecord(props) {
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

TransactionRecord.propTypes = {
  _id: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  amount: propTypes.number.isRequired,
  date: propTypes.number.isRequired,
  merchant: propTypes.string.isRequired,
  note: propTypes.string,
  list: propTypes.array.isRequired,
  setList: propTypes.func.isRequired,
};
