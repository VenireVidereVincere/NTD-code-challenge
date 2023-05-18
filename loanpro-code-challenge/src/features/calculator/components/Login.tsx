import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setLoginError, clearLoginError } from "../../../app/slices/errors";
import { setAuthToken, setUsername } from "../../../app/slices/user";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const error = useAppSelector((state) => state.errors.loginError)
  const username = useAppSelector((state) => state.user.username)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate data. Username must be a valid email, PW can't be empty.
    if (!emailRegex.test(username)) {
      dispatch(setLoginError("The username must be a valid email address"));
      return
    } else {
      const passwordElement = document.getElementById("password") as HTMLInputElement;
      const password = passwordElement.value;
      if (!password) {
        dispatch(setLoginError("Please enter a password"));
        return;
      }
      // If data validation was successful, send login request:
      dispatch(clearLoginError())
      loginRequest(username, password)
    }
  }
  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value))
  }

  const loginRequest = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // *************
        // LOGIN SUCCESSFUL
        const data = await response.json()
        dispatch(setAuthToken(data.token))
        navigate('/new-operation')
      } else {
        // *************
        // LOGIN FAILURE
        dispatch(setLoginError('Invalid credentials!'));        
      }
    } catch (error) {
      console.error('Error logging in:', error);
      dispatch(setLoginError('Failed to log in, network error'));
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          className="form-control" 
          onChange={handleUsernameChange}
          />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" className="form-control" />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;