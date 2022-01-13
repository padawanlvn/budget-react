import React, { useState, useEffect } from "react";
import axios from "axios";

function NavBar(props) {
  const quoteURL = "https://v2.jokeapi.dev/joke/Any?type=single";
  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios.get(quoteURL).then((response) => {
      setQuote(response.data.joke);
    });
  }, []);

  return (
    <nav className="navbar navbar-light bg-info bg-gradient">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          My Budget
        </a>
        <a>Random joke: {quote}</a>
      </div>
    </nav>
  );
}

export default NavBar;
