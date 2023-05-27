import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "../App.css";
import axios from "axios";
import app_config from "../config";
const url = app_config.app_url;

const DataShow = () => {
  const [calculations, setCalculations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCalculations();
  }, []);

  const fetchCalculations = async () => {
    try {
      const response = await axios.get(url + "/api/calculations");
      setCalculations(response.data);
    } catch (error) {
      console.error("Failed to fetch calculations", error);
      setError("Failed to fetch calculations. Please try again later.");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(url + "/api/calculations/" + _id);
      setCalculations((prevCalculations) => {
        return prevCalculations.filter((calculation) => calculation._id !== _id);
      });
    } catch (error) {
      console.error("Failed to delete calculation", error);
      setError("Failed to delete calculation. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mt-8 ml-10">Calculations History</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="history-table border mb-10 ml-10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expression</th>
            <th>Result</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {calculations.map((calculation) => (
            <tr key={calculation._id} className="history-row">
              <td>{calculation.text}</td>
              <td>{calculation.expression}</td>
              <td>{calculation.result}</td>
              <td>
                <button className="cursor-pointer" onClick={() => handleDelete(calculation._id)}>
                  <RiDeleteBin6Fill size={20}  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataShow;
