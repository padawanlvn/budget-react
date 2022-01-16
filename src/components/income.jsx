import React, { Component, useState, useContext, useEffect } from "react";
import { Context } from "./billsContext";

const Incomes = (props) => {
  const { incomesv, keyv } = useContext(Context);
  const [incomes, setIncomes] = incomesv;
  const [key] = keyv;

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

  const handleNewAmount = (income, amount) => {
    amount = amount || 0;
    income.amount = parseFloat(amount);
    setIncomes([...incomes]);
  };

  const handleNewLabel = (income, label) => {
    incomes.label = label;
    setIncomes([...incomes]);
  };

  const handleRemoveIncome = (income) => {
    const newIncomes = incomes.filter((t) => t !== income);

    if (newIncomes.length == 0) {
      setIncomes([]);
    } else {
      setIncomes([...newIncomes]); // can't just pass in, need to set to a whole new array
    }
  };

  return incomes?.map((income) => (
    <div className="pb-1" key={income.id}>
      <input
        placeholder="What's coming in?"
        onChange={(e) => handleNewLabel(income, e.target.value)}
      ></input>
      :$
      <input
        type="number"
        placeholder="0.00"
        onChange={(e) => handleNewAmount(income, e.target.value)}
        style={{ backgroundColor: income.amount > 0 ? green : red }}
      ></input>
      <button onClick={(e) => handleRemoveIncome(income)}>-</button>
    </div>
  ));
};

export default Incomes;
