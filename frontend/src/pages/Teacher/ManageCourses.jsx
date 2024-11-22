import React, { useState, useEffect } from "react";
import TeacherMenu from "./TeacherMenu";
import {
  useShowCreatedCoursesQuery,
  useUpdatePositioningMutation,
} from "../../redux/api/usersApiSlice";
import { useDeleteCourseMutation } from "../../redux/api/coursesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const ManageCourses = () => {
  const userDetails = useSelector((state) => state.user);
  const id = userDetails.userInfo._id;
  const { data, refetch, isLoading, isError, error } =
    useShowCreatedCoursesQuery(id);
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

  const [updatePositioningApi] = useUpdatePositioningMutation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    refetch();
    if (data) setCourses(data);
  }, [data, refetch]);

  const UpdatePositioning = async (newCourses) => {
    try {
      const coursesId = newCourses.map((course) => course._id);
      await updatePositioningApi({ id, coursesId }).unwrap();
      toast.success("Positioning is done successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = courses.findIndex((course) => course._id === active.id);
    const newIndex = courses.findIndex((course) => course._id === over.id);

    const newCourses = arrayMove(courses, oldIndex, newIndex);
    setCourses(newCourses);
    UpdatePositioning(newCourses);
  };

  const sensors = useSensors(useSensor(MouseSensor));

  return (
    <div className="flex">
      <TeacherMenu />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <Message variant="error">{error?.data?.Error}</Message>
        </div>
      ) : (
        <div>
          <div className="text-xl text-white text-center my-10">My Courses</div>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={courses}>
              <div className="grid grid-cols-3 gap-4 mt-4 ml-[3rem] text-white w-[70rem]">
                {courses.map((course) => (
                  <SortableItem key={course._id} id={course._id}>
                    <div className="mb-5 cursor-grab active:cursor-grabbing hover:scale-[1.05] transition-all">
                      <div className="w-[20rem] h-[11rem] mb-3">
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="text-lg text-white">{course.name}</div>
                      <div className="mt-2 text-white">
                        {course.teacherName}
                      </div>
                      <div className="flex mt-3 items-center">
                        <Button
                          color="green"
                          customCSS="mr-[18rem]"
                          onClick={() =>
                            navigate(
                              `/profile/teacher/courses/update/${course._id}`
                            )
                          }
                        >
                          Update
                        </Button>
                        <button
                          className="text-red-500 ml-[-4rem] hover:text-red-600"
                          onClick={() => deleteCourse(course._id)}
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
