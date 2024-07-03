import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutesTeacher = () => {
  const user = useSelector((state) => state.user);
  return user?.userInfo.role === "teacher" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutesTeacher;
