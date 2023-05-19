import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setOperationRecords, setFilter } from "../../../app/slices/operations";
import { setOperationRecordsError, clearOperationRecordsError } from "../../../app/slices/errors";
import { setRequestedPage } from "../../../app/slices/operations";

const operationsTable: { [key: number]: string } = {
  1: 'Multiplication',
  2: 'Addition',
  3: 'Substraction',
  4: 'Division',
  5: 'Square Root',
  6: 'Random String Generation',
};

const UserRecords: React.FC = () => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((state) => state.operations.operationRecords);
  const currentPage = useAppSelector((state) => state.operations.requestedPage)
  const filter = useAppSelector((state) => state.operations.filter)
  const token = useAppSelector((state) => state.user.authToken)
  const error = useAppSelector((state) => state.errors.operationRecordsError)

  console.log(records)

  const fetchRecords = () => {
    fetch(`${process.env.REACT_APP_API_URL}/operations/records?page=${currentPage}&filter=${filter}&limit=3`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setOperationRecords(data));
      })
      .catch((error) => {
        dispatch(setOperationRecordsError(error))
      });
  }
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Send HTTP request and retrieve paginated records
    fetchRecords()
  };

  const handleDeleteRecord = (id: number) => {
    // Send HTTP request to delete the record with the given id
    fetch(`${process.env.REACT_APP_API_URL}/operations/record/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json()
          dispatch(setOperationRecordsError(data.message))
          fetchRecords()          
        } 
      })
      .catch((error) => {
        dispatch(setOperationRecordsError(error))
      });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(e.target.value))
  }

  const handlePageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(Number(e.target.value))){
      dispatch(setRequestedPage(Number(e.target.value)))
    }
  }
  // Cleanup
  useEffect(() => {
    dispatch(clearOperationRecordsError())
    
  }, [])

  return (
    <div className="container">
      <h2>User Records</h2>
      {error && <div className={`alert ${error === "Record deleted successfully" ? 'alert-success' : 'alert-danger'}`}>
        {error.toString()}
      </div>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="pageNumber">Page Number:</label>
          <input
            type="text"
            id="pageNumber"
            className="form-control"
            value={currentPage}
            onChange={(e) => handlePageNumberChange(e)}
          />
                  <label htmlFor="type">Type:</label>
          <select
            id="type"
            className="form-control"
            onChange={(e) => handleTypeChange(e)}
          >
            <option value="all"> All </option>
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
            <option value="square_root">Square Root</option>
            <option value="random_string_generation">Random String</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Load Records
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Operation</th>
            <th>Cost</th>
            <th>Operation Response</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            return (
              <tr key={record.id}>
                <td>{operationsTable[record.operation_id]}</td>
                <td>{record.cost}</td>
                <td>{record.operation_response}</td>
                <td>{record.date}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRecord(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserRecords;