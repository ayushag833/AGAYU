import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user);
  return user?.userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedRoutes;
