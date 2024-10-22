import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUploadMutation } from "../../redux/api/usersApiSlice";
import Button from "../../components/Button";
import { useGetAllCategoriesQuery } from "../../redux/api/categoriesApiSlice";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "../../redux/api/coursesApiSlice";
import AddCourseContent from "./AddCourseContent";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import AddCourseSubContent from "./AddCourseSubContent";
import { useParams } from "react-router";
import TeacherMenu from "./TeacherMenu";

const UpdateCourse = () => {
  const [content, setContent] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showSubContent, setShowSubContent] = useState({
    show: false,
    contentIndex: null,
  });

  const { id } = useParams();
  const [updateApi] = useUpdateCourseMutation();
  const [uploadApi] = useUploadMutation();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: course } = useGetCourseByIdQuery(id);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    image: "",
    includes: "",
    modules: "",
    rightAudience: "",
    category: "",
    requirements: "",
    tags: [],
    tagsInput: "",
    readyToPublished: null,
    language: "",
    levels: "",
  });

  useEffect(() => {
    if (course) {
      setFormData(course);
      setContent(course.content);
    }
  }, [course]);

  console.log(content);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateApi({
        id,
        ...formData,
        content,
      }).unwrap();
      toast.success("Course Updated successfully");
    } catch (error) {
      console.log(error.data.msg);
      toast.error(error.data.msg);
    }
  };

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function imageHandler(e) {
    try {
      const res = await uploadApi(e.target.files[0]).unwrap();
      toast.success(res?.message);
      setFormData((prev) => {
        return { ...prev, image: res.file };
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter" && formData.tagsInput.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, formData.tagsInput.trim()],
        tagsInput: "",
      }));
    }
  }

  function removeTag(index) {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="flex">
      <TeacherMenu update={true} />
      {showContent && (
        <AddCourseContent
          setContent={setContent}
          setShowContent={setShowContent}
        />
      )}
      {showSubContent.show && (
        <AddCourseSubContent
          setShowSubContent={setShowSubContent}
          contentIndex={showSubContent.contentIndex}
          setContent={setContent}
        />
      )}
      <div className="flex justify-center mt-[2rem] w-[70rem]">
        <form className="ml-[5rem]" onSubmit={submitHandler}>
          <h1 className="text-center text-white mt-5 mb-10 text-xl">
            Update Course
          </h1>

          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-slate-200"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={formData.name}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-md font-medium text-slate-200"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="description"
              className="block text-md font-medium text-slate-200"
            >
              Description
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-md font-medium text-slate-200"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>

          <div className="flex gap-10">
            <div>
              <label
                htmlFor="image"
                className="block text-md font-medium text-slate-200"
              >
                Thumbnail
              </label>
              <input
                type="file"
                name="image"
                onChange={imageHandler}
                accept=".jpg, .jpeg, .png, .webp"
                className="mt-1 mb-5 block bg-slate-50 rounded-md text-md
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
              />
            </div>
            <img
              src={formData?.image}
              className="w-[10rem] border object-cover object-top"
            />
          </div>
          <div>
            <h1 className="text-md font-medium text-slate-200 mb-2">
              Course Content
            </h1>
            {content?.map((contentDetail, index) => (
              <div className="text-white" key={index}>
                <div className="border-2 p-2 mb-2 rounded-md">
                  <div className="flex justify-between p-2 mb-2 items-center">
                    <h1>
                      {contentDetail.title
                        ? contentDetail.title
                        : contentDetail}
                    </h1>
                    <RxCross2
                      className="text-xl font-extrabold duration-150 ease-in-out hover:opacity-80 cursor-pointer"
                      onClick={() => {
                        setContent((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  </div>
                  {contentDetail?.subContent?.map((subContentDetail, ind) => (
                    <div
                      className="flex justify-between p-2 mb-2 items-center border"
                      key={ind}
                    >
                      <h1>{subContentDetail.title}</h1>
                      <RxCross2
                        className="text-xl font-extrabold duration-150 ease-in-out hover:opacity-80 cursor-pointer"
                        onClick={() => {
                          setContent((prev) => {
                            const updated = [...prev];
                            const currentItem = { ...updated[index] };
                            if (currentItem.subContent) {
                              currentItem.subContent =
                                currentItem.subContent.filter(
                                  (_, i) => i !== ind
                                );
                              updated[index] = currentItem;
                            }
                            return updated;
                          });
                        }}
                      />
                    </div>
                  ))}
                  <div
                    className="flex justify-center w-fit items-center p-2 text-sm font-medium text-slate-200 border-2 cursor-pointer rounded-md"
                    onClick={() => {
                      setShowSubContent({
                        show: true,
                        contentIndex: index,
                      });
                    }}
                  >
                    <h1 className="p-2 text-sm font-medium text-slate-200">
                      Add Video Content
                    </h1>
                    <h1 className="text-lg mx-1 mb-1">
                      <FaPlus />
                    </h1>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="flex"
              onClick={() => {
                setShowContent(true);
              }}
            >
              <div className="flex justify-center items-center p-2 text-sm font-medium text-slate-200 border-2 cursor-pointer rounded-md">
                <h1 className="flex p-2 text-sm font-medium text-slate-200">
                  Add Course Content
                </h1>
                <h1 className="text-lg mx-1 mb-1">
                  <FaPlus />
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="includes"
              className="block text-md font-medium text-slate-200"
            >
              What this course Includes?
            </label>
            <textarea
              type="text"
              name="includes"
              placeholder="Enter Details"
              value={formData.includes}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div className="mt-5">
            <label
              htmlFor="modules"
              className="block text-md font-medium text-slate-200"
            >
              Modules
            </label>
            <textarea
              type="text"
              name="modules"
              placeholder="Enter Modules"
              value={formData.modules}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div className="mt-5">
            <label
              htmlFor="rightAudience"
              className="block text-md font-medium text-slate-200"
            >
              Right Audience
            </label>
            <textarea
              type="text"
              name="rightAudience"
              placeholder="Enter Right Audience"
              value={formData.rightAudience}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-md font-medium text-slate-200"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories?.AllCategories?.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <label
              htmlFor="requirements"
              className="block text-md font-medium text-slate-200"
            >
              Requirements
            </label>
            <textarea
              type="text"
              name="requirements"
              placeholder="Enter Requirements"
              value={formData.requirements}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-md font-medium text-slate-200"
            >
              Tags
            </label>
            <input
              type="text"
              name="tagsInput"
              placeholder="Enter Tags"
              value={formData.tagsInput}
              onChange={changeHandler}
              onKeyDown={handleTagKeyDown}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div className="mb-5">
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-md"
                  >
                    <span>{tag}</span>
                    <button
                      className="ml-2 text-lg text-gray-500 hover:text-gray-700"
                      onClick={() => removeTag(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="levels"
              className="block text-md font-medium text-slate-200"
            >
              Levels
            </label>
            <select
              name="levels"
              id="levels"
              value={formData.levels}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            >
              <option value="" disabled>
                Select Level
              </option>
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="language"
              className="block text-md font-medium text-slate-200"
            >
              Language
            </label>
            <input
              type="text"
              name="language"
              placeholder="Course Language"
              value={formData.language}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="readyToPublished"
              className="block text-md font-medium text-slate-200"
            >
              Ready To Published ?
            </label>
            <select
              name="readyToPublished"
              id="readyToPublished"
              value={formData.readyToPublished}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
          </div>
          <div className="mt-5">
            <Button color="green">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
