import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import NewOperation from "../components/NewOperation";
import UserRecords from "../components/UserRecords";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/new-operation',
        element: <NewOperation />
      },
      {
        path: '/user-records',
        element: <UserRecords />
      }
    ]
  }
])