import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import _uniqueId from "lodash/uniqueId";
import propTypes from "prop-types";

/**
 * InputBox is a component that represents a input and label to create a new transaction.
 */
export default function InputBox(props) {
  const [id] = useState(_uniqueId("input-"));

  return (
    <div className="form-floating my-3">
      <input
        className="form-control"
        id={id}
        value={props.value}
        onChange={props.onChange}
        placeholder={""}
        type={props.type}
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

InputBox.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  type: propTypes.string,
  feedback: propTypes.string,
  required: propTypes.bool,
};
