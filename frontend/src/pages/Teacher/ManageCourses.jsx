import React from "react";
import TeacherMenu from "./TeacherMenu";
import { useShowCreatedCoursesQuery } from "../../redux/api/usersApiSlice";
import { useDeleteCourseMutation } from "../../redux/api/coursesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

const ManageCourses = () => {
  const userDetails = useSelector((state) => state.user);
  const id = userDetails.userInfo._id;
  const { data, isLoading, isError, error } = useShowCreatedCoursesQuery(id);
  const [deleteApi] = useDeleteCourseMutation();

  const navigate = useNavigate();

  const deleteCourse = async (id) => {
    const val = prompt('Type "DELETE" to permanently delete your course.');
    if (val === "DELETE") {
      try {
        await deleteApi(id).unwrap();
        toast.success("Course deleted successfully");
      } catch (error) {
        console.log(error.data.msg);
        toast.error(error.data.msg);
      }
    }
  };

  return (
    <div className="flex">
      <TeacherMenu />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <Message variant="error">{error?.error}</Message>
        </div>
      ) : (
        <div>
          <div className="text-xl text-white text-center my-10">My Courses</div>

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
                    <Button
                      color="green"
                      customCSS="mr-[9rem]"
                      onClick={() =>
                        navigate(`/profile/teacher/courses/update/${item._id}`)
                      }
                    >
                      Update
                    </Button>
                    <button
                      className="text-red-500 ml-[5rem] hover:text-red-600"
                      onClick={() => {
                        deleteCourse(item._id);
                      }}
                    >
                      <FaTrash className="text-xl" />
                    </button>
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

export default ManageCourses;
