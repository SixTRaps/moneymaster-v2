import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BasicLayout from "../BasicLayout.js";
import TransactionList from "./TransactionList.js";

export default function ShowTransaction() {
  return (
    <BasicLayout>
      <div className="view-port container d-flex flex-column">
        <div
          className="text-center py-3 position-relative"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          <h1 className="border-bottom">Show All Transactions</h1>
        </div>
        <div className="flex-grow-1">
          <TransactionList />
        </div>
      </div>
    </BasicLayout>
  );
}
