import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutesAdmin = () => {
  const user = useSelector((state) => state.user);
  return user?.userInfo?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutesAdmin;
