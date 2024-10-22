import React from "react";
import AdminMenu from "./AdminMenu";
import { useFetchAllCoursesQuery } from "../../redux/api/coursesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetAllUsersQuery } from "../../redux/api/usersApiSlice";
import { useNavigate } from "react-router";

const AdminRevenue = () => {
  const { data, isLoading, isError, error } = useFetchAllCoursesQuery();
  const { data: users } = useGetAllUsersQuery();
  const navigate = useNavigate();

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
        <div className="flex flex-col items-center mt-[2rem] h-fit w-[70rem]  gap-[1rem] text-white">
          <div className="text-3xl">Total Revenue</div>
          <div className="mt-[2.5rem] ml-[3rem] w-[90%]">
            {data?.map((item) => (
              <div
                key={item._id}
                className="flex items-enter mb-[1rem] pb-5 justify-between border-b"
              >
                <div
                  className="flex cursor-pointer justify-between w-full"
                  onClick={() => navigate(`/course/${item._id}`)}
                >
                  <div className="w-[13.5rem] h-[7.5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4 text-white">
                    {item.name}
                    <div className="mt-1 text-white">{item.teacherName}</div>
                    <div className="mt-1 text-white">{item.title}</div>
                    <div className="mt-1 text-white font-bold whitespace-nowrap">
                      $ {item.price}
                    </div>
                  </div>
                </div>
                <div className="ml-10">
                  <div className="mt-2 text-white font-bold whitespace-nowrap">
                    Students Enrolled : {item.studentsEnrolled.length}
                  </div>
                  <div className="mt-2 text-white font-bold whitespace-nowrap">
                    Revenue : $ {item.studentsEnrolled.length * item.price}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <div className="mt-2 text-white font-bold whitespace-nowrap text-3xl">
                Total Revenue : $
                {users.Users.reduce((acc, cur) => {
                  return acc + cur.totalRevenue;
                }, 0)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRevenue;
