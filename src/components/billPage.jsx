//import { getByTestId } from "@testing-library/react";
//import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import React, { useState, useEffect, useContext } from "react";
import Bills from "./bills";
import EndingAmount from "./endingAmount";
import { Context } from "./billsData";

function BillPage() {
  const { billsv, keyv } = useContext(Context);
  const [bills, setBills] = billsv;
  const [key, setKey] = keyv;
  const [startingAmount, setStartingAmount] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);

  /* I need to add a unique key for the Bills array for React
   */
  const getKey = () => {
    const retVal = key + 1;
    setKey(retVal);
    return retVal;
  };

  const handleClickNewBill = () => {
    setBills((oldBills) => [
      ...oldBills,
      { id: getKey(), label: "", amount: 0 },
    ]);
  };

  const handleStartingAmountChange = (amount) => {
    setStartingAmount(parseFloat(amount));
  };

  const handleTotalDeductionsChange = (amount) => {
    setTotalDeductions(parseFloat(amount));
  };

  return (
    <div>
      <div>
        I gots PAID YO!
        <input
          defaultValue={setStartingAmount}
          type="number"
          onChange={(e) => handleStartingAmountChange(e.target.value)}
        ></input>
        <button onClick={handleClickNewBill}>
          Click to add something to pay
        </button>
      </div>

      <Bills onTotalDeductionsChange={handleTotalDeductionsChange}></Bills>

      <EndingAmount
        start={startingAmount}
        deductions={totalDeductions}
      ></EndingAmount>
    </div>
  );
}

export default BillPage;
