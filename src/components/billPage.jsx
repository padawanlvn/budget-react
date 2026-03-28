//import { getByTestId } from "@testing-library/react";
//import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import React, { useState, useContext } from "react";
import Bills from "./bills";
import Incomes from "./income";
import EndingAmount from "./endingAmount";
import { Context } from "./billsContext";

function BillPage() {
  const { billsv, incomesv } = useContext(Context);
  const [bills, dispatchBills] = billsv;
  const [incomes, dispatchIncomes] = incomesv;
  const [startingAmount, setStartingAmount] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [isImportVisible, setIsImportVisible] = useState(false);
  const [importText, setImportText] = useState("");
  const red = "#db7093";
  const green = "#adff2f";

  const handleClickNewBill = () => {
    dispatchBills({ type: "add" });
  };

  const handleImportTemplate = () => {
    if (!importText.trim()) return;

    const lines = importText.split("\n");
    const newBills = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      let cleanLine = line.replace(/^[\-\*]\s*/, "").trim();
      const amountMatch = cleanLine.match(/\$?\s*([\d,]+\.?\d*)\s*$/);
      let amount = "";
      let label = cleanLine;

      if (amountMatch) {
        amount = parseFloat(amountMatch[1].replace(/,/g, ""));
        label = cleanLine.substring(0, amountMatch.index).trim();
      }

      label = label.replace(/[:\-]\s*$/, "").trim();

      if (label || amount !== "") {
        newBills.push({ label, amount });
      }
    }

    if (newBills.length > 0) {
      dispatchBills({ type: "pasteMultiple", payload: newBills });
      setImportText("");
      setIsImportVisible(false);
    }
  };

  const handleClickNewIncome = () => {
    dispatchIncomes({ type: "add" });
  };

  const handleStartingAmountChange = (amount) => {
    amount = amount || 0;
    setStartingAmount(parseFloat(amount));
  };

  const handleTotalDeductionsChange = (amount) => {
    setTotalDeductions(parseFloat(amount));
  };

  const handleTotalIncomesChange = (amount) => {
    setTotalIncomes(parseFloat(amount));
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
      </div>

      <div className="row">
        <div className="col">
          <div className="pb-2 d-flex flex-column gap-2 align-items-start">
            <div className="d-flex flex-row gap-2">
              <button 
                className="btn btn-outline-secondary"
                onClick={handleClickNewBill}
              >
                Click to add something to pay
              </button>
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setIsImportVisible(!isImportVisible)}
              >
                {isImportVisible ? "Cancel Import" : "Import Template"}
              </button>
            </div>
            {isImportVisible && (
              <div className="d-flex flex-column gap-2 w-100">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Paste list here (e.g. - Chase: $400)"
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                />
                <button className="btn btn-sm btn-primary align-self-start" onClick={handleImportTemplate}>
                  Parse & Insert
                </button>
              </div>
            )}
          </div>
          <Bills onTotalDeductionsChange={handleTotalDeductionsChange}></Bills>
        </div>

        <div className="col">
          <div className="pb-2">
            <button className="btn btn-outline-secondary" onClick={handleClickNewIncome}>
              Click to add mula coming IN
            </button>
          </div>
          <Incomes onTotalIncomesChange={handleTotalIncomesChange}></Incomes>
        </div>
      </div>

      <EndingAmount
        start={startingAmount}
        deductions={totalDeductions}
        incomes={totalIncomes}
      ></EndingAmount>
    </div>
  );
}

export default BillPage;
