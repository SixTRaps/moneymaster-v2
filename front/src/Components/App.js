import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import Signin from "./signin";
import Signup from "./signup";
import Dashboard from "./dashboard";
import logo from "../images/logo.png";
import "../stylesheets/style.css";
import AddBudget from "./addBudget";
import NewTransaction from "./newTransaction";
import ShowTransaction from "./showTransaction";
import Statistics from "./statistics";

export default function App() {
  const [user, setUser] = useState();
  const [list, setList] = useState([]);
  const [expense, setExpense] = useState({});

  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
      console.log(username);
    });
  }, []);

  useEffect(() => {
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
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    setExpense({});
    const categories = [
      "housing",
      "transportation",
      "consumables",
      "livingExpense",
      "savings",
      "debt",
    ];
    for (let category of categories) {
      const array = list.filter((item) => item.category === category);
      if (array.length === 0) continue;
      setExpense((prev) => ({ ...prev, [category]: array }));
    }
  }, [list]);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img
              src={logo}
              alt="moneyMaster logo"
              width="40"
              height="40"
              className="d-inline-block"
            />
            <span className="brand">Money Master</span>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<HomePage user={user} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard username={user} />} />
        <Route path="/addBudget" element={<AddBudget />} />
        <Route
          path="/newTransaction"
          element={<NewTransaction user={user} />}
        />
        <Route
          path="/showTransactions"
          element={
            <ShowTransaction user={user} list={list} setList={setList} />
          }
        />
        <Route path="/statistics" element={<Statistics expense={expense} />} />
      </Routes>
    </BrowserRouter>
  );
}

async function getUsername() {
  const res = await fetch("/api/user");
  if (res.status === 200) {
    const users = await res.json();
    const username = await users.username;
    console.log("username:", username);
    return username;
  }
}
