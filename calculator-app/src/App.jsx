import React, { useState } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [newNumber, setNewNumber] = useState(true);
  const [isScientificMode, setIsScientificMode] = useState(false);

  const handleNumber = (number) => {
    if (newNumber) {
      setInput(number);
      setNewNumber(false);
    } else {
      setInput(input + number);
    }
  };

  const handleOperator = (op) => {
    if (input === '') return;

    if (firstOperand === null) {
      setFirstOperand(parseFloat(input));
    } else if (!newNumber) {
      const result = performCalculation(firstOperand, parseFloat(input), operator);
      setFirstOperand(result);
      setResult(result);
    }

    setOperator(op);
    setNewNumber(true);
  };

  const handleScientificOperation = (operation) => {
    if (input === '') return;
    const number = parseFloat(input);
    let result;

    switch (operation) {
      case 'sin':
        result = Math.sin(number * (Math.PI / 180));
        break;
      case 'cos':
        result = Math.cos(number * (Math.PI / 180));
        break;
      case 'tan':
        result = Math.tan(number * (Math.PI / 180));
        break;
      case 'sqrt':
        result = Math.sqrt(number);
        break;
      case 'square':
        result = number * number;
        break;
      case 'log':
        result = Math.log10(number);
        break;
      case 'ln':
        result = Math.log(number);
        break;
      case 'pow':
        setFirstOperand(number);
        setOperator('pow');
        setNewNumber(true);
        return;
      default:
        return;
    }

    setInput(result.toString());
    setResult(result);
    setNewNumber(true);
  };

  const handleEqual = () => {
    if (firstOperand === null || operator === null || newNumber) return;

    const result = performCalculation(firstOperand, parseFloat(input), operator);
    setInput(result.toString());
    setResult(result);
    setFirstOperand(null);
    setOperator(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setFirstOperand(null);
    setOperator(null);
    setNewNumber(true);
  };

  const performCalculation = (operand1, operand2, operator) => {
    let result;
    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand1 / operand2;
        break;
      case 'pow':
        result = Math.pow(operand1, operand2);
        break;
      default:
        result = operand2;
    }
    return Math.round(result * 1000000) / 1000000;
  };

  return (
    <div className="calculator">
      <Display value={input || result || '0'} />
      <button
        className="mode-toggle"
        onClick={() => setIsScientificMode(!isScientificMode)}
      >
        {isScientificMode ? 'Basic' : 'Scientific'}
      </button>
      <div className="buttons">
        <div className="basic-buttons">
          <Button label="7" onClick={() => handleNumber('7')} />
          <Button label="8" onClick={() => handleNumber('8')} />
          <Button label="9" onClick={() => handleNumber('9')} />
          <Button label="+" onClick={() => handleOperator('+')} />

          <Button label="4" onClick={() => handleNumber('4')} />
          <Button label="5" onClick={() => handleNumber('5')} />
          <Button label="6" onClick={() => handleNumber('6')} />
          <Button label="-" onClick={() => handleOperator('-')} />

          <Button label="1" onClick={() => handleNumber('1')} />
          <Button label="2" onClick={() => handleNumber('2')} />
          <Button label="3" onClick={() => handleNumber('3')} />
          <Button label="*" onClick={() => handleOperator('*')} />

          <Button label="0" onClick={() => handleNumber('0')} />
          <Button label="." onClick={() => handleNumber('.')} />
          <Button label="=" onClick={handleEqual} />
          <Button label="/" onClick={() => handleOperator('/')} />

          <Button label="C" onClick={handleClear} />
        </div>

        {isScientificMode && (
          <div className="scientific-buttons">
            <Button label="sin" onClick={() => handleScientificOperation('sin')} />
            <Button label="cos" onClick={() => handleScientificOperation('cos')} />
            <Button label="tan" onClick={() => handleScientificOperation('tan')} />
            <Button label="√" onClick={() => handleScientificOperation('sqrt')} />
            <Button label="x²" onClick={() => handleScientificOperation('square')} />
            <Button label="log" onClick={() => handleScientificOperation('log')} />
            <Button label="ln" onClick={() => handleScientificOperation('ln')} />
            <Button label="xʸ" onClick={() => handleScientificOperation('pow')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;