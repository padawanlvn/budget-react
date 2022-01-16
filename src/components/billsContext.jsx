import React, { useRef, useReducer } from "react";

export const Context = React.createContext();

let key = 0;

const reducerBills = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { id: key++, label: "", amount: 0 }];
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

const reducerIncomes = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { id: key++, label: "", amount: 0 }];
    case "remove":
      let newIncomes = state.filter((t) => t !== action.payload);

      if (newIncomes.length == 0) {
        newIncomes = [];
      } else {
        newIncomes = [...newIncomes]; // can't just pass in, need to set to a whole new array
      }

      return newIncomes;
    case "changeAmount":
      action.payload.amount = action.payload.amount || 0;
      action.payload.income.amount = parseFloat(action.payload.amount);
      return [...state];
    case "changeLabel":
      action.payload.income.label = action.payload.label;
      return [...state];
    default:
      return state;
  }
};

const BillsContext = ({ children }) => {
  const initialBillsState = [],
    initialIncomesState = [];
  const [bills, dispatchBills] = useReducer(reducerBills, initialBillsState);
  const [incomes, dispatchIncomes] = useReducer(
    reducerIncomes,
    initialIncomesState
  );

  return (
    <Context.Provider
      value={{
        billsv: [bills, dispatchBills],
        incomesv: [incomes, dispatchIncomes],
        //keyv: [key],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default BillsContext;
