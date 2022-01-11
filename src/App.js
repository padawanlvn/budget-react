import logo from "./logo.svg";
import "./App.css";
import React from "react";
import NavBar from "./components/navbar";
import BillPage from "./components/billPage";

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <main className="container">
        <BillPage />
      </main>
    </React.Fragment>
  );
}

export default App;
