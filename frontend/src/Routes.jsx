import React from "react";
import Login from "./Components/Authentication/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
const router = createBrowserRouter([
  { path: "", element: <Home /> },
  { path: "login", element: <Login /> },
]);

function Routes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Routes;
