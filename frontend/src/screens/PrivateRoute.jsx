import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrivateRoute() {
  const { userData } = useSelector((state) => state.auth);

  return userData ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
