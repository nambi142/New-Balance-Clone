import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../Contaxt/Store";

const ProtectedRoute = ({ children }) => {
  const { user } = useStore();

  return user ? children : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
