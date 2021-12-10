import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BasicLayout from "../BasicLayout.js";
import TransactionList from "./TransactionList.js";

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
          <TransactionList />
        </div>
      </div>
    </BasicLayout>
  );
}
