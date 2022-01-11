import logo from "./logo.svg";
import "./App.css";
import React from "react";
import NavBar from "./components/navbar";
import BillPage from "./components/billPage";
import BillsData from "./components/billsData";

function App() {
  return (
    <BillsData>
      <NavBar></NavBar>
      <main className="container">
        <BillPage />
      </main>
    </BillsData>
  );
}

export default App;
