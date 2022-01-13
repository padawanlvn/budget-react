import React, { Component, useState, useContext, useEffect } from "react";
import { Context } from "./billsData";

const Bills = (props) => {
  const { billsv, keyv } = useContext(Context);
  const [bills, setBills] = billsv;
  const [key, setKey] = keyv;

  const red = "#db7093";
  const green = "#adff2f";

  /* Add up all the Bill amounts as the Total deductions 
     whenever the Bills are updated*/
  useEffect(() => {
    if (bills.length > 0) {
      props.onTotalDeductionsChange(
        bills.map((i) => i.amount).reduce((prev, next) => prev + next)
      );
    }
  }, [bills]);

  /* I need to add a unique key for the Bills array for React
   */
  const getKey = () => {
    const retVal = key + 1;
    setKey(retVal);
    return retVal;
  };

  const handleNewAmount = (bill, amount) => {
    amount = amount || 0;
    bill.amount = parseFloat(amount);
    setBills([...bills]);
  };

  const handleNewLabel = (bill, label) => {
    bill.label = label;
    setBills([...bills]);
  };

  const handleRemoveBill = (bill) => {
    const newBills = bills.filter((t) => t !== bill);

    if (newBills.length == 0) {
      setBills([{ id: getKey(), label: "", amount: 0 }]);
    } else {
      setBills([...newBills]); // can't just pass in, need to set to a whole new array
    }
  };

  return bills.map((bill) => (
    <div key={bill.id}>
      <input
        placeholder="Whatcha payin?"
        onChange={(e) => handleNewLabel(bill, e.target.value)}
      ></input>
      :$
      <input
        type="number"
        placeholder="0.00"
        onChange={(e) => handleNewAmount(bill, e.target.value)}
        style={{ backgroundColor: bill.amount > 0 ? green : red }}
      ></input>
      <button onClick={(e) => handleRemoveBill(bill)}>-</button>
    </div>
  ));
};

export default Bills;