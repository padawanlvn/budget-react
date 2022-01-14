import React, { useRef, useState } from "react";

export const Context = React.createContext();

const BillsData = ({ children }) => {
  const [bills, setBills] = useState([]);
  //  const [key, setKey] = useState(0);
  const key = useRef(0);

  return (
    <Context.Provider
      value={{
        billsv: [bills, setBills],
        keyv: [key],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default BillsData;
