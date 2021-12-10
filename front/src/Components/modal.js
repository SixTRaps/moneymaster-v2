import React from "react";

export default function Modal({ children }) {
  return (
    <div className="modal-bg">
      <div className="modal">
        <div>{children}</div>
        <p>Window automatically closed in 3s...</p>
      </div>
    </div>
  );
}
