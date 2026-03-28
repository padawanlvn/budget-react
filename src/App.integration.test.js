import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Markdown Bills Importer & Empty Value Logic', () => {
  test('Pastes multiple markdown bills, maps empty and explicit values correctly, and totals correctly', () => {
    // Render the App with all Contexts active
    render(<App />);
    
    // Find and click the 'Import Template' toggle
    const importToggleBtn = screen.getByText('Import Template');
    fireEvent.click(importToggleBtn);

    // Find the textarea
    const textarea = screen.getByPlaceholderText(/Paste list here/i);
    
    // Simulate user pasting markdown text with missing vs explicit zeros
    const simulatedPasteList = `
- Netflix: 
- Car Payment: $400
- Water: 
- Electricity: $0
    `;
    fireEvent.change(textarea, { target: { value: simulatedPasteList } });

    // Click Parse & Insert
    const parseBtn = screen.getByText('Parse & Insert');
    fireEvent.click(parseBtn);

    // After parsing, there are zero native bills at start, so 4 fields should be created
    const numberInputs = screen.getAllByPlaceholderText('0.00');
    expect(numberInputs).toHaveLength(4);
    
    // 1. Netflix (empty)
    expect(numberInputs[0]).toHaveValue(null);
    expect(numberInputs[0]).toHaveStyle('background-color: #db7093');
    
    // 2. Car Payment ($400)
    expect(numberInputs[1]).toHaveValue(400);
    expect(numberInputs[1]).toHaveStyle('background-color: #adff2f');
    
    // 3. Water (empty)
    expect(numberInputs[2]).toHaveValue(null);
    expect(numberInputs[2]).toHaveStyle('background-color: #db7093');

    // 4. Electricity ($0)
    expect(numberInputs[3]).toHaveValue(0);
    expect(numberInputs[3]).toHaveStyle('background-color: #adff2f');

    // Manually type '0' into the empty Water field to test standard user entry
    fireEvent.change(numberInputs[2], { target: { value: '0' } });
    expect(numberInputs[2]).toHaveValue(0);
    // Background should turn green
    expect(numberInputs[2]).toHaveStyle('background-color: #adff2f');

    // Arithmetic Total validation
    // Initial balance (0) + incomes(0) - bills(400 + 0 + 0) = -400
    // Wait, the calculation handles absolute formatting dynamically!
    // Searching the entire ending string logic
    // Actually the ending amount component renders `-400`
    const endingTextElement = screen.getByText(/This is how much I have left:/i);
    // Because the string combines "This is how much I have left: $-400.00"
    expect(endingTextElement).toHaveTextContent('-400.00');
  });

  test('Calculates remainder correctly based on Starting amounts, Incomes and Bills', () => {
    render(<App />);

    // 1. Set Starting Amount (Paid)
    const startingAmountInput = screen.getByPlaceholderText('Starting balance...');
    fireEvent.change(startingAmountInput, { target: { value: '1000' } });

    // 2. Add Mula Coming In (Income)
    const addIncomeBtn = screen.getByText('Click to add mula coming IN');
    fireEvent.click(addIncomeBtn);

    // 3. Add 7 Bills
    const addBillBtn = screen.getByText('Click to add something to pay');
    const billAmounts = [34, 45, 3, 45, 23, 235, 400];
    
    for(let i = 0; i < 7; i++) {
      fireEvent.click(addBillBtn);
    }

    // Retrieve all newly created amount input fields (Bills are mapped first in DOM, then Income)
    const allNumberInputs = screen.getAllByPlaceholderText('0.00');
    expect(allNumberInputs).toHaveLength(8);

    // Apply the 7 Bill amounts
    for(let i = 0; i < 7; i++) {
      fireEvent.change(allNumberInputs[i], { target: { value: billAmounts[i].toString() } });
    }

    // Apply the Income amount (last element parsed in the DOM node mapping)
    fireEvent.change(allNumberInputs[7], { target: { value: '1000' } });

    // 4. Verification Check: Leftover Cash should be exactly $ 1215.00
    // Math checks out: 1000 + 1000 - (34+45+3+45+23+235+400) = 1215.00
    const endingTextElement = screen.getByText(/This is how much I have left:/i);
    expect(endingTextElement).toHaveTextContent('1215.00');
  });
});
