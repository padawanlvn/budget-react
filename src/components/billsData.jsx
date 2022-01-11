import React, { useState } from "react";

export const Context = React.createContext();

const BillsData = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [key, setKey] = useState(0);

  return (
    <Context.Provider
      value={{
        billsv: [bills, setBills],
        keyv: [key, setKey],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default BillsData;
