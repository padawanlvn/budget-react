import React, { Component, useContext, useEffect } from "react";
import { Context } from "./billsContext";

const Incomes = (props) => {
  const { incomesv } = useContext(Context);
  const [incomes, dispatchIncomes] = incomesv;

  const red = "#db7093";
  const green = "#adff2f";

  /* Add up all the Incomes amounts as the Total income 
     whenever the Incomes are updated*/
  useEffect(() => {
    if (incomes.length > 0) {
      props.onTotalIncomesChange(
        incomes.map((i) => i.amount).reduce((prev, next) => prev + next)
      );
    } else {
      props.onTotalIncomesChange(0);
    }
  }, [incomes]);

  const handleRemoveIncome = (income) => {
    dispatchIncomes({
      type: "remove",
      payload: income,
    });
  };

  return incomes?.map((income) => (
    <div className="pb-1" key={income.id}>
      <input
        placeholder="What's coming in?"
        onChange={(e) =>
          dispatchIncomes({
            type: "changeLabel",
            payload: { income: income, label: e.target.value },
          })
        }
      ></input>
      :$
      <input
        type="number"
        placeholder="0.00"
        onChange={(e) =>
          dispatchIncomes({
            type: "changeAmount",
            payload: { income: income, amount: e.target.value },
          })
        }
        style={{ backgroundColor: income.amount > 0 ? green : red }}
      ></input>
      <button onClick={(e) => handleRemoveIncome(income)}>-</button>
    </div>
  ));
};

export default Incomes;
