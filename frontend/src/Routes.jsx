import React from "react";
import Login from "./Components/Authentication/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Authentication/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

function Routes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Routes;
