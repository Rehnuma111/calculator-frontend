import React, { useEffect, useState } from "react";
import "./App.css";
import DataShow from "./Component/DataShow";
import axios from "axios";
import app_config from "./config";
const url = app_config.app_url;

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [calculations, setCalculations] = useState([]);

  // const addCalculation = async () => {
  //   try {
  //     const response = await axios.post(url + "/api/calculations", {
  //       expression,
  //       result,
  //     });
  //     console.log(response.data);
  //     setCalculations([...calculations, response.data]);
  //     console.log("data", calculations);
  //     setExpression("");
  //     setResult("");
  //   } catch (error) {
  //     console.error("Failed to add calculation", error);
  //   }
  // };

  // const addCalculation = async (expression, result ) => {
  //   try {
  //     const response = await axios.post(url + "/api/calculations", {
  //       expression,
  //       result,
  //     });
  //     console.log(response.data);
  //     setCalculations([...calculations, response.data]);
  //     console.log("data", calculations);
  //     setExpression("");
  //     setResult("");
  //   } catch (error) {
  //     console.error("Failed to add calculation", error);
  //   }
  // };
  const addCalculation = async (expression, result) => {
    try {
      const response = await axios.post(url + "/api/calculations", {
        expression,
        result,
      });
      console.log(response.data);
      setCalculations((prevCalculations) => [...prevCalculations, response.data]);
      console.log("data", calculations);
      setExpression("");
      setResult("");
    } catch (error) {
      console.error("Failed to add calculation", error);
      // Handle the error, such as displaying an error message or performing additional actions
    }
  };
  



  const handleButtonClick = (value) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleClear = () => {
    setExpression("");
  };

  const handleCalculate = () => {
    try {
      const result = eval(expression);
      setExpression(result.toString());
      setResult(result.toString());
  
      console.log("express", expression);
      console.log("result", result);
  
      // addCalculation(expression, result.toString()); // Call addCalculation with the updated values
    } catch (error) {
      setExpression("Error");
      // setResult("");
    }
  };
  
  let submitTimeout;

  const submitCalcName = (e) => {
    e.preventDefault();

    // Clear any previous timeout
    clearTimeout(submitTimeout);

    // Set a new timeout to delay the function call
    submitTimeout = setTimeout(() => {
      const finalValue = {
        text: e.target.value,
        result: result,
        expression: expression,
      };

      console.log(finalValue);

      axios
        .post(url + "/api/calculations", finalValue)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500); // Adjust the delay (in milliseconds) as per your requirements
  };


  useEffect(() => {
    addCalculation();
  }, [submitTimeout]);


  return (
    <>
      <div className="container mx-auto p-9 border mt-2 ">
        <h1 className="text-3xl font-bold mb-4 ">Calculator</h1>
        <div className="calculator-grid">
          <div className="display ">{expression}</div>
          <button className="clear-button " onClick={handleClear}>
            C
          </button>

          <button
            className="operation-button"
            onClick={() => handleButtonClick("%")}
          >
            %
          </button>
          <button
            className="operation-button"
            onClick={() => handleButtonClick("+")}
          >
            +
          </button>
          <button
            className="number-button"
            onClick={() => handleButtonClick("8")}
          >
            8
          </button>

          <button
            className="number-button"
            onClick={() => handleButtonClick("4")}
          >
            4
          </button>
          <button
            className="number-button"
            onClick={() => handleButtonClick("5")}
          >
            5
          </button>
          <button
            className="operation-button"
            onClick={() => handleButtonClick("-")}
          >
            -
          </button>
          <button
            className="number-button"
            onClick={() => handleButtonClick("6")}
          >
            6
          </button>

          <button
            className="number-button"
            onClick={() => handleButtonClick("2")}
          >
            2
          </button>
          <button
            className="number-button"
            onClick={() => handleButtonClick("3")}
          >
            3
          </button>

          <button
            className="operation-button"
            onClick={() => handleButtonClick("/")}
          >
            /
          </button>

          <button
            className="number-button"
            onClick={() => handleButtonClick("7")}
          >
            7
          </button>
          <button
            className="number-button"
            onClick={() => handleButtonClick("9")}
          >
            9
          </button>
          <button
            className="number-button"
            onClick={() => handleButtonClick("1")}
          >
            1
          </button>
          <button
            className="operation-button"
            onClick={() => handleButtonClick("*")}
          >
            *
          </button>

          <button
            className="number-button zero-button"
            onClick={() => handleButtonClick("0")}
          >
            0
          </button>
          <button
            className="number-button"
            onClick={() => handleButtonClick(".")}
          >
            .
          </button>
          <button className="equal-button" onClick={handleCalculate}>
            =
          </button>
        </div>
      </div>

      {/* Calculations History */}
      <div className="m-10">
        <h2 className="text-xl font-bold mt-8 ">Calculations Name</h2>
        <div className="flex w-8">
          <input
            type="text"
            placeholder="Enter Name"
            className="border border-3-gray flex-grow px-2 py-2"
            onChange={(e) => {
              submitCalcName(e);
            }}
          />
          <button className="bg-blue-950 ml-2 px-5 text-white">Save</button>
        </div>
      </div>
      <DataShow />
    </>
  );
}

export default App;
