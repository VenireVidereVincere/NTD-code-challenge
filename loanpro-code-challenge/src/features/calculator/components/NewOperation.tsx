import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setSelectedOperation, setFirstNum, setSecondNum, setOperationResult } from "../../../app/slices/operations";
import { setOperationError, clearOperationError } from "../../../app/slices/errors";
import { clearOperationResult } from "../../../app/slices/operations";
import { setBalance } from "../../../app/slices/user";

const NewOperation: React.FC = () => {
  // Setup subscriptions for all the pieces of state we need for the component.
  const selectedOperation = useAppSelector((state)=> state.operations.selectedOperation)
  const firstNum = useAppSelector((state) => state.operations.firstNum)
  const secondNum = useAppSelector((state) => state.operations.secondNum)
  const error = useAppSelector((state) => state.errors.operationError)
  const result = useAppSelector((state) => state.operations.result)
  const token = useAppSelector((state) => state.user.authToken)
  const balance = useAppSelector((state) => state.user.balance)

  // Setup dispatch
  const dispatch = useAppDispatch()

  // Setup handler functions
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const operationType = e.target.value;
    dispatch(setSelectedOperation(operationType));
    dispatch(setFirstNum(0))
    dispatch(setSecondNum(0))
  };

  const handleFirstNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if( !isNaN(Number(e.target.value))){
      dispatch(setFirstNum(Number(e.target.value)))
    }
  }
  const handleSecondNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if( !isNaN(Number(e.target.value))){
      dispatch(setSecondNum(Number(e.target.value)))
    }    
  }
  // Handles submitting the form
  const handleSubmit = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const endpoint = `${apiUrl}/operations/request`;
    dispatch(clearOperationError())
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Manually set the token in the Authorization header
      },
      body: JSON.stringify({
        firstNum,
        secondNum,
        type: selectedOperation
      })
    };
    // Handles updating the balance after the request was successful
    const updateBalance = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/get-balance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }
        const data = await response.json()
        dispatch(setBalance(data.balance))

      } catch (error) {
        dispatch(setOperationError("Failed to fetch balance"))
      }
    }
  
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message) {
          dispatch(setOperationError(data.message))
        }
        if(data.error){
          dispatch(setOperationError(data.error))
        }
        // Handle the response data here
        dispatch(setOperationResult(data.result))
        updateBalance()
      })
      .catch(error => {
        console.log(error)
        if(error.message){
          dispatch(setOperationError(error.message))
        } else {
          dispatch(setOperationError(error))
        }
      });
  };
  // checkers for conditional components
  const isSquareRoot = selectedOperation === "square_root";
  const isRandomString = selectedOperation === "random_string_generation";

  // Cleanup useEffect
  useEffect(() => {
    dispatch(setFirstNum(0))
    dispatch(setSecondNum(0))
    dispatch(clearOperationError())
    dispatch(clearOperationResult())
  }, [])

  useEffect(() => {
    const updateBalance = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/get-balance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }
        const data = await response.json()
        dispatch(setBalance(data.balance))

      } catch (error) {
        dispatch(setOperationError("Failed to fetch balance"))
      }
    }
    updateBalance()
  },[])


  return (
    <div className="container">
      <h2>New Operation</h2>
      {error && (
  <div className={`alert ${error === "Operation successful!" ? 'alert-success' : 'alert-danger'}`}>
    {error.toString()}
  </div>
)}
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          className="form-control"
          onChange={handleTypeChange}
        >
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
          <option value="square_root">Square Root</option>
          <option value="random_string_generation">Random String</option>
        </select>
      </div>
      {!isRandomString && (
        <>
          <div className="form-group">
            <label htmlFor="firstNum">First Number:</label>
            <input
              type="text"
              id="firstNum"
              className="form-control"
              value={firstNum}
              onChange={(e) => handleFirstNumChange(e)}
            />
          </div>
          {!isSquareRoot && (
            <div className="form-group">
              <label htmlFor="secondNum">Second Number:</label>
              <input
                type="text"
                id="secondNum"
                className="form-control"
                value={secondNum}
                onChange={(e) => handleSecondNumChange(e)}
              />
            </div>
          )}
        </>
      )}
      <button className="btn btn-primary" onClick={handleSubmit}>Request Operation</button>
      {(result || result === 0) && (
      <div className="result-container">
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    )}
      <div className="balance-container">
        <h3>Balance:</h3>
        <p>{balance}</p>
      </div>
    </div>
  );
};

export default NewOperation;