import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutesStudent = () => {
  const user = useSelector((state) => state.user);
  return user?.userInfo.role === "student" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutesStudent;
