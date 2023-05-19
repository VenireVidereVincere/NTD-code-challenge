import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { clearAuthToken, setAuthToken } from "../../../app/slices/user";
import { useAppDispatch } from "../../../app/hooks";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // Check if the current route is '/'
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/logout`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem('authToken');
        dispatch(clearAuthToken())
        navigate('/')
      })
      .catch((error) => {
        console.error("Failed to logout:", error); // Replace with your desired error handling logic
      });
  };
  // Hydrating authentication token. If no token is found and we're not in the login page, the user is redirected to the login page. 
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      dispatch(setAuthToken(storedToken))
    }
    // Attempt to fetch the balance. If successful, the token is valid. If unsuccessful, redirect to login. 
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/get-balance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${storedToken}`
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

      } catch (error) {
        navigate('/')
      }
    };
    fetchBalance();
    if (!storedToken && location.pathname !== '/') {
      navigate('/')
    }
  }, []);

  return (
    <div>
      {!isHomePage && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink to="/new-operation" className="nav-link">
                    New Operation
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/user-records" className="nav-link">
                    User Records
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </div>
  );
};

export default Navbar;