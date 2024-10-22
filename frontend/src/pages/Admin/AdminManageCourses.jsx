import React from "react";
import AdminMenu from "./AdminMenu";
import {
  useFetchAllCoursesQuery,
  useApproveCourseMutation,
} from "../../redux/api/coursesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AdminManageCourses = () => {
  const { data, isLoading, isError, error, refetch } =
    useFetchAllCoursesQuery();
  const [approveApi] = useApproveCourseMutation();

  const navigate = useNavigate();

  const approveCourse = async (id, approvedByAdmin) => {
    try {
      await approveApi({ id, approvedByAdmin }).unwrap();
      if (approvedByAdmin) toast.success("Course Approved successfully");
      else toast.error("Course Not Approved successfully");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.Error);
    }
  };

  return (
    <div className="flex">
      <AdminMenu />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <Message variant="error">{error?.error}</Message>
        </div>
      ) : (
        <div>
          <div className="text-2xl text-white text-center my-10">
            Manage Courses
          </div>
          <div className="grid grid-cols-3 mt-[2rem] ml-10 w-[70rem] text-white">
            {data.map((item) => (
              <div
                key={item._id}
                className="flex items-enter mb-[1rem] pb-2 justify-between"
              >
                <div className="flex flex-col">
                  <div className="w-[20rem] h-[11rem] mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="text-lg text-white">{item.name}</div>
                  <div className="mt-2 text-white">{item.teacherName}</div>
                  <div className="flex justify-between mt-3 items-center">
                    {item.approvedByAdmin ? (
                      <Button
                        color="green"
                        onClick={() => approveCourse(item._id, false)}
                      >
                        Approved
                      </Button>
                    ) : (
                      <Button
                        color="red"
                        onClick={() => approveCourse(item._id, true)}
                      >
                        Not Approved
                      </Button>
                    )}
                    <Button
                      color="black"
                      onClick={() => {
                        navigate(`/course/adminview/${item._id}`);
                      }}
                    >
                      View Course
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageCourses;
