import React, { Component } from "react";

const Bills = (props) => {
  const handleNewAmount = (bill, amount) => {
    bill.amount = parseFloat(amount);
    props.onBillChange(props.data);
  };

  const handleNewLabel = (bill, label) => {
    bill.label = label;
    props.onBillChange(props.data);
  };

  const handleRemoveBill = (bill) => {
    props.onBillChange(props.data.filter((t) => t !== bill));
  };

  return props.data.map((bill) => (
    <div key={bill.id}>
      <input
        placeholder="Whatcha payin?"
        onChange={(e) => handleNewLabel(bill, e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="$0.00"
        onChange={(e) => handleNewAmount(bill, e.target.value)}
      ></input>
      <button onClick={(e) => handleRemoveBill(bill)}>-</button>
    </div>
  ));
};

export default Bills;
