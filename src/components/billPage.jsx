//import { getByTestId } from "@testing-library/react";
//import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import React, { useRef, useState, useContext } from "react";
import Bills from "./bills";
import EndingAmount from "./endingAmount";
import { Context } from "./billsData";

function BillPage() {
  const { billsv, keyv } = useContext(Context);
  const [bills, setBills] = billsv;
  const [key] = keyv;
  const [startingAmount, setStartingAmount] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const red = "#db7093";
  const green = "#adff2f";

  const handleClickNewBill = () => {
    setBills((oldBills) => [
      ...oldBills,
      { id: key.current++, label: "", amount: 0 },
    ]);
  };

  const handleStartingAmountChange = (amount) => {
    amount = amount || 0;
    setStartingAmount(parseFloat(amount));
  };

  const handleTotalDeductionsChange = (amount) => {
    setTotalDeductions(parseFloat(amount));
  };

  return (
    <div className="d-grid gap-1">
      <div>
        I gots PAID YO! $
        <input
          className="mx-3"
          defaultValue={setStartingAmount}
          type="number"
          placeholder="Starting balance..."
          onChange={(e) => handleStartingAmountChange(e.target.value)}
          style={{ backgroundColor: startingAmount > 0 ? green : red }}
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
