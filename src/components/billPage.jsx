//import { getByTestId } from "@testing-library/react";
//import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import React, { useState, useEffect } from "react";
import Bills from "./bills";
import EndingAmount from "./endingAmount";

function BillPage() {
  const [bills, setBills] = useState([]);
  const [startingAmount, setStartingAmount] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [key, setKey] = useState(0);

  /* Add up all the Bill amounts as the Total deductions 
     whenever the Bills are updated*/
  useEffect(() => {
    if (bills.length > 0) {
      setTotalDeductions(
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

  const handleClickNewBill = () => {
    setBills((oldBills) => [
      ...oldBills,
      { id: getKey(), label: "", amount: 0 },
    ]);
  };

  const handleStartingAmountChange = (amount) => {
    setStartingAmount(parseFloat(amount));
  };

  const handleBillChange = (newBills) => {
    if (newBills.length == 0) {
      setBills([{ id: getKey(), label: "", amount: 0 }]);
    } else {
      setBills([...newBills]); // can't just pass in, need to set to a whole new array
    }
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

      <Bills data={bills} onBillChange={handleBillChange}></Bills>

      <EndingAmount
        start={startingAmount}
        deductions={totalDeductions}
      ></EndingAmount>
    </div>
  );
}

export default BillPage;
