import React, { useRef, useState } from "react";

export const Context = React.createContext();

const BillsData = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const key = useRef(0);

  return (
    <Context.Provider
      value={{
        billsv: [bills, setBills],
        incomesv: [incomes, setIncomes],
        keyv: [key],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default BillsData;
