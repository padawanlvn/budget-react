import logo from "./logo.svg";
import "./App.css";
import React from "react";
import NavBar from "./components/navbar";
import BillPage from "./components/billPage";
import BillsData from "./components/billsData";
import Footer from "./components/footer";
import Intro from "./components/intro";

function App() {
  return (
    <BillsData>
      <NavBar></NavBar>
      <main className="container">
        <Intro />
        <BillPage />
      </main>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <Footer />
        </div>
      </div>
    </BillsData>
  );
}

export default App;
