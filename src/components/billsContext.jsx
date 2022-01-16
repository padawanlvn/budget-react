import React, { useRef, useReducer, useState } from "react";

export const Context = React.createContext();

let key1 = 0;

const reducerBills = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { id: key1++, label: "", amount: 0 }];
    case "remove":
      let newBills = state.filter((t) => t !== action.payload);

      if (newBills.length == 0) {
        newBills = [];
      } else {
        newBills = [...newBills]; // can't just pass in, need to set to a whole new array
      }

      return newBills;
    case "changeAmount":
      action.payload.amount = action.payload.amount || 0;
      action.payload.bill.amount = parseFloat(action.payload.amount);
      return [...state];
    case "changeLabel":
      action.payload.bill.label = action.payload.label;
      return [...state];
    default:
      return state;
  }
};

const BillsContext = ({ children }) => {
  const initialBillsState = [];
  const [bills, dispatchBills] = useReducer(reducerBills, initialBillsState);
  const [incomes, setIncomes] = useState([]);
  const key = useRef(0);

  return (
    <Context.Provider
      value={{
        billsv: [bills, dispatchBills],
        incomesv: [incomes, setIncomes],
        keyv: [key],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default BillsContext;
