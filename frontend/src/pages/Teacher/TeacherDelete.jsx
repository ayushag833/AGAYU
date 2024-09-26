import React from "react";
import TeacherMenu from "./TeacherMenu";
import { useDeleteUserMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const TeacherDelete = () => {
  const [deleteUser] = useDeleteUserMutation();
  const userDetails = useSelector((state) => state.user);
  const id = userDetails.userInfo._id;

  const deleteHandler = async () => {
    const val = prompt('Type "DELETE" to permanently delete your account.');
    if (val === "DELETE") {
      try {
        await deleteUser(id).unwrap();
        toast.success("User account is permanently deleted");
      } catch (error) {
        console.error(error.message);
        toast.error("Error in deleting your account");
      }
    }
  };
  return (
    <div className="flex">
      <TeacherMenu />
      <div className="flex flex-col items-center justify-center h-[30rem] w-[70rem]  gap-[1rem] text-white">
        <div className="text-xl mr-5">Delete Account</div>
        <div className="flex flex-col items-center justify-center h-[20rem] w-[70rem]  gap-[1rem]">
          <div>Are you sure you want to delete your account?</div>
          <div>All of your data will be permanently deleted.</div>
          <button
            className="bg-red-200 h-[5rem] w-[10rem] p-[0.5rem] font-bold text-lg rounded-lg text-red-800 border-red-800 border-4"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDelete;
