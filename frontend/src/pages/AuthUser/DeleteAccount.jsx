import React from "react";
import { useDeleteUserMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Button from "../../components/Button";

const DeleteAccount = () => {
  const [deleteUser] = useDeleteUserMutation();
  const userDetails = useSelector((state) => state.user);
  const id = userDetails.userInfo._id;

  const deleteHandler = async () => {
    const val = prompt('Type "DELETE" to permanently delete your account.');
    if (val === "DELETE") {
      try {
        await deleteUser(id).unwrap();
        toast.success("Your account is permanently deleted");
      } catch (error) {
        console.error(error.message);
        toast.error("Error in deleting your account");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-[22rem] w-[70rem]  gap-[1rem] text-white">
      <div className="text-xl mr-5">Delete Account</div>
      <div className="flex flex-col items-center justify-center h-[12rem] w-[70rem]  gap-[1rem]">
        <div>Are you sure you want to delete your account?</div>
        <div>All of your data will be permanently deleted.</div>
        <Button
          customCSS="bg-red-200 font-bold text-[1.2rem] rounded-lg text-red-800 border w-[6rem] h-[3rem]"
          onClick={deleteHandler}
          color="red"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
