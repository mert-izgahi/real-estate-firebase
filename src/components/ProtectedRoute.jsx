import React, { useEffect } from "react";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAppContext();
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated]);

  return <>{children}</>;
};

export default ProtectedRoute;
