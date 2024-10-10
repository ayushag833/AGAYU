import React from "react";
import AdminMenu from "./AdminMenu";

const AdminRevenue = () => {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex flex-col items-center mt-[2rem] h-[30rem] w-[70rem]  gap-[1rem] text-white">
        <div className="text-xl">Total Revenue</div>
      </div>
    </div>
  );
};

export default AdminRevenue;
