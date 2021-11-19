import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard(props) {
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   getUsername().then((username) => {
  //     setUser(username);
  //     console.log(username);
  //   });
  // }, []);

  return (
    <div>
      {props.username === undefined ? (
        <h1>Welcome! Visitor!</h1>
      ) : (
        <h1>Welcome! {props.username}</h1>
      )}
      <div>
        Remaining Balance/Budget:{balance}/{budget}
      </div>
      <NavLink to="/ledger" className="btn" value="Ledger" />
      <NavLink to="/stat" className="btn" value="Statistics" />
    </div>
  );
}

// async function getUsername() {
//   const res = await fetch("/api/user");
//   if (res.status === 200) {
//     const users = await res.json();
//     const username = await users.username;
//     console.log("username:", username);
//     return username;
//   }
// }
