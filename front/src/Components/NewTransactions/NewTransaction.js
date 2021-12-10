import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BasicLayout from "../BasicLayout.js";
import CreateTransaction from "./CreateTransaction.js";

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
          <CreateTransaction />
        </div>
      </div>
    </BasicLayout>
  );
}
