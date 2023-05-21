import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const second_token = window.localStorage.getItem("token");
  const isAuthenticated = second_token !== null && second_token !== undefined;
  !isAuthenticated && console.warn("Unauthenticated");
  // location for checking present route
  const location = useLocation();
  if (!children) {
    return <div>Please pass a component inside protected route</div>;
  }
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return (
    <Navigate
      to={{ pathname: "/login", search: location.search }}
      replace
      state={{ from: location }}
    />
  );
}

export default ProtectedRoute;
