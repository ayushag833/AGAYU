import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useUploadMutation,
} from "../../redux/api/usersApiSlice";
import { userInformation } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import TeacherMenu from "./TeacherMenu";
import { useGetAllCategoriesQuery } from "../../redux/api/categoriesApiSlice";

const TeacherCreateCourse = () => {
  // const userDetails = useSelector((state) => state.user);
  // const user = userDetails?.userInfo;

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
  });

  const dispatch = useDispatch();
  const [updateApi] = useUpdateUserMutation();
  const [uploadApi] = useUploadMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // const res = await updateApi({
      //   id: user._id,
      //   ...formData,
      // }).unwrap();
      // dispatch(userInformation(res));
      // toast.success("User updated successfully");
    } catch (error) {
      console.log(error, error.message);
      toast.error("Can't update User at this time. Try again later!");
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
      // dispatch(userInformation({ ...user, image: res.file }));
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
      <TeacherMenu />
      <div className="flex justify-center mt-[2rem] w-[70rem]">
        <form className="ml-[5rem]" onSubmit={submitHandler}>
          <h1 className="text-center text-white mt-5 mb-10 text-xl">
            Create Course
          </h1>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-200"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={formData.name}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-200"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-200"
            >
              Description
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-slate-200"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>

          <div className="flex gap-10">
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-slate-200"
              >
                Thumbnail
              </label>
              <input
                type="file"
                name="image"
                onChange={imageHandler}
                className="mt-1 mb-5 block bg-slate-50 rounded-md text-sm
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
              />
            </div>
            <img src={formData?.image} className="w-[5rem]" />
          </div>
          <div className="mt-5">
            <label
              htmlFor="includes"
              className="block text-sm font-medium text-slate-200"
            >
              What this course Includes?
            </label>
            <textarea
              type="text"
              name="includes"
              placeholder="Enter Details"
              value={formData.includes}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div className="mt-5">
            <label
              htmlFor="modules"
              className="block text-sm font-medium text-slate-200"
            >
              Modules
            </label>
            <textarea
              type="text"
              name="modules"
              placeholder="Enter Modules"
              value={formData.modules}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div className="mt-5">
            <label
              htmlFor="rightAudience"
              className="block text-sm font-medium text-slate-200"
            >
              Right Audience
            </label>
            <textarea
              type="text"
              name="rightAudience"
              placeholder="Enter Right Audience"
              value={formData.rightAudience}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-200"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            >
              <option value="">Select Category</option>
              {categories?.AllCategories?.map((category) => (
                <option value={category.title} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-slate-200"
            >
              Requirements
            </label>
            <input
              type="text"
              name="requirements"
              placeholder="Enter Requirements"
              value={formData.requirements}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-slate-200"
            >
              Tags
            </label>
            <input
              type="text"
              name="tagsInput"
              placeholder="Enter Tags"
              value={formData.tagsInput} // Bind tagsInput to the input field
              onChange={changeHandler}
              onKeyDown={handleTagKeyDown}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
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
          <div className="mt-5">
            <Button color="green">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherCreateCourse;
