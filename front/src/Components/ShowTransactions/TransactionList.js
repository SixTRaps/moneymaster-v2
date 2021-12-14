import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TransactionRecord from "./TransactionRecord.js";

/**
 * TransactionList is a component that shows all transactions.
 */
export default function TransactionList() {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setMsg("Loading data...");
    fetch("/api/allTransactions", {
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
        setMsg("");
      });
  }, []);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(list.length / 5);

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
          <p>{msg}</p>
          <div className="flex-container list-group list-group-flush d-flex justify-content-evenly">
            {list.slice(page * 5 - 5, page * 5).map((i, index) => (
              <TransactionRecord
                key={"Transaction-" + index}
                id={i.id}
                category={i.category}
                amount={parseFloat(i.amount)}
                date={i.date}
                merchant={i.merchant}
                note={i.note}
                list={list}
                setList={setList}
              />
            ))}
          </div>
          <div
            className="d-flex justify-content-evenly"
            role="group"
            aria-label="page navigation button"
          >
            <button
              className="custom-btn"
              onClick={prevPage}
              style={{ height: "10%" }}
            >
              Prev
            </button>
            <div>
              Page {page}/{totalPages}
            </div>
            <button
              className="custom-btn"
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
