import React from "react";
import ReactDOM from "react-dom";

import Navigation from "./Components/navigation";

function App() {
  return (
    <div>
      <Navigation />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
