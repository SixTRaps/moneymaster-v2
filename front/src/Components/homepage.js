import React from "react";
import Dashboard from "./dashboard";
import { Link } from "react-router-dom";

export default function Homepage(props) {
  return (
    <div className="welcome container">
      {props.user === undefined ? (
        <div>
          <div className="d-flex align-items-center flex-column">
            <h1>Money Master</h1>
          </div>
          <div className="d-flex align-items-center flex-column">
            <h2>Your personal budget keeper</h2>
          </div>
          <div className="sign-buttons d-flex justify-content-evenly align-items-center">
            <Link to="/signin" className="btn btn-warning">
              Sign in
            </Link>
            <Link to="/signup" className="btn btn-warning">
              Sign up
            </Link>
          </div>
        </div>
      ) : (
        <Dashboard username={props.user} />
      )}
    </div>
  );
}
