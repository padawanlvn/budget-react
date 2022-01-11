import React, { Component } from "react";

function NavBar(props) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          My Budget{" "}
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
