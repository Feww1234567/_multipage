import React, { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [lastDisplayValue, setLastDisplayValue] = useState(null);
  const [lastingOperator, setLastingOperator] = useState(null);
  const [clearCheck, setClearCheck] = useState(false);
  const [highlightedOperator, setHighlightedOperator] = useState(null);
  const [clearButtonText, setClearButtonText] = useState("CE");

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyName = event.key;
      if ("0123456789".includes(keyName)) {
        handleNumberClick(keyName);
      } else if (["+", "-", "*", "/", "**"].includes(keyName)) {
        handleOperatorClick(keyName);
      } else if (keyName === "Enter") {
        handleEqualClick();
      } else if (keyName === "Backspace") {
        handleClearClick();
      } else if (keyName === ".") {
        handleDecimalClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClearClick = () => {
    if (clearButtonText === "C") {
      setDisplayValue("");
      setClearButtonText("CE");
    } else {
      setDisplayValue("");
      setLastDisplayValue(null);
      setLastingOperator(null);
      setClearCheck(false);
      setHighlightedOperator(null);
    }
  };

  const handleNumberClick = (number) => {
    if (clearCheck) {
      setDisplayValue(number);
      setClearCheck(false);
    } else {
      setDisplayValue((prev) => prev + number);
    }
    setClearButtonText("C");
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue((prev) => prev + ".");
    }
    setClearButtonText("C");
  };

  const handleOperatorClick = (operator) => {
    if (displayValue) {
      if (lastDisplayValue !== null && lastingOperator) {
        handleEqualClick();
      }
      setLastDisplayValue(parseFloat(displayValue));
      setLastingOperator(operator);
      setDisplayValue("");
      setHighlightedOperator(operator);
      setClearButtonText("CE");
    }
  };

  const handleEqualClick = () => {
    if (lastingOperator && displayValue) {
      let result;
      const currentValue = parseFloat(displayValue);
      switch (lastingOperator) {
        case "+":
          result = lastDisplayValue + currentValue;
          break;
        case "-":
          result = lastDisplayValue - currentValue;
          break;
        case "*":
          result = lastDisplayValue * currentValue;
          break;
        case "/":
          result = lastDisplayValue / currentValue;
          break;
        case "**":
          result = Math.pow(lastDisplayValue, currentValue);
          break;
        default:
          return;
      }
      setDisplayValue(String(result));
      setLastDisplayValue(result);
      setLastingOperator(null);
      setClearCheck(true);
      setHighlightedOperator(null);
      setClearButtonText("CE");
    }
  };

  return (
    <div className="calculator-container">
      <i id="input-container">
        <input
          className="input-display"
          type="text"
          id="Number"
          value={displayValue}
          readOnly
          disabled
        />
      </i>
      <span id="box1">
        <button disabled>MC</button>
        <button disabled>ME</button>
        <button disabled>M+</button>
        <button disabled>M-</button>
        <button onClick={handleClearClick} id="clear">
          {clearButtonText}
        </button>
      </span>
      <span id="box2">
        <button onClick={() => handleNumberClick("7")}>7</button>
        <button onClick={() => handleNumberClick("8")}>8</button>
        <button onClick={() => handleNumberClick("9")}>9</button>
        <button
          onClick={() => handleOperatorClick("/")}
          className={highlightedOperator === "/" ? "highlight" : ""}
        >
          /
        </button>
        <button
          onClick={() => handleOperatorClick("**")}
          className={highlightedOperator === "**" ? "highlight" : ""}
        >
          **
        </button>
      </span>
      <span id="box3">
        <button onClick={() => handleNumberClick("4")}>4</button>
        <button onClick={() => handleNumberClick("5")}>5</button>
        <button onClick={() => handleNumberClick("6")}>6</button>
        <button
          onClick={() => handleOperatorClick("*")}
          className={highlightedOperator === "*" ? "highlight" : ""}
        >
          &times;
        </button>
        <button disabled>%</button>
      </span>
      <span id="box4">
        <button onClick={() => handleNumberClick("1")}>1</button>
        <button onClick={() => handleNumberClick("2")}>2</button>
        <button onClick={() => handleNumberClick("3")}>3</button>
        <button
          onClick={() => handleOperatorClick("-")}
          className={highlightedOperator === "-" ? "highlight" : ""}
          id="sub"
        >
          &minus;
        </button>
        <button disabled>1/x</button>
      </span>
      <span id="box5">
        <button onClick={() => handleNumberClick("0")}>0</button>
        <button onClick={handleDecimalClick}>.</button>
        <button disabled>+/-</button>
        <button
          onClick={() => handleOperatorClick("+")}
          className={highlightedOperator === "+" ? "highlight" : ""}
          id="add"
        >
          +
        </button>
        <button onClick={handleEqualClick}>=</button>
      </span>
    </div>
  );
};

export default Calculator;
