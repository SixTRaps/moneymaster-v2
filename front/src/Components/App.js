import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import Signin from "./signin";
import Signup from "./signup";
import "../stylesheets/style.css";
import NewTransaction from "./newTransaction";
import ShowTransaction from "./showTransaction";
import Statistics from "./statistics";

/* This is the App component that consists all kinds of routing. */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newTransaction" element={<NewTransaction />} />
        <Route path="/showTransactions" element={<ShowTransaction />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}
