import React, { Component, useContext, useEffect } from "react";
import { Context } from "./billsContext";

const Bills = (props) => {
  const { billsv } = useContext(Context);
  const [bills, dispatchBills] = billsv;

  const red = "#db7093";
  const green = "#adff2f";

  /* Add up all the Bill amounts as the Total deductions 
     whenever the Bills are updated*/
  useEffect(() => {
    if (bills.length > 0) {
      props.onTotalDeductionsChange(
        bills.map((i) => i.amount).reduce((prev, next) => prev + next)
      );
    } else {
      props.onTotalDeductionsChange(0);
    }
  }, [bills]);

  const handleRemoveBill = (bill) => {
    dispatchBills({
      type: "remove",
      payload: bill,
    });
  };

  return bills?.map((bill) => (
    <div className="pb-1" key={bill.id}>
      <input
        placeholder="Whatcha payin?"
        onChange={(e) =>
          dispatchBills({
            type: "changeLabel",
            payload: { bill: bill, label: e.target.value },
          })
        }
      ></input>
      :$
      <input
        type="number"
        placeholder="0.00"
        onChange={(e) =>
          dispatchBills({
            type: "changeAmount",
            payload: { bill: bill, amount: e.target.value },
          })
        }
        style={{ backgroundColor: bill.amount > 0 ? green : red }}
      ></input>
      <button onClick={(e) => handleRemoveBill(bill)}>-</button>
    </div>
  ));
};

export default Bills;
