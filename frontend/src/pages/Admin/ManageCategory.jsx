import React, { useState } from "react";
import StudentMenu from "./AdminMenu";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoriesApiSlice";
import Button from "../../components/Button";
import { toast } from "react-toastify";

const ManageCategory = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(null);
  // const { data: category } = useGetCategoryQuery(id);
  const { data: allCategory } = useGetAllCategoriesQuery();
  const [createApi] = useCreateCategoryMutation();
  const [updateApi] = useUpdateCategoryMutation();
  const [deleteApi] = useDeleteCategoryMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(title);
      await createApi({ title }).unwrap();
      toast.success("Category created successfully");
      setTitle("");
    } catch (error) {
      console.log(error?.data?.Error);
      toast.error(error?.data?.Error);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await updateApi({ id: value._id, title: value.title }).unwrap();
      toast.success("Category updated successfully");
      setTitle("");
    } catch (error) {
      console.log(error.data.msg);
      toast.error(error.data.msg);
    }
  };

  const deleteHandler = async (e) => {
    const val = prompt('Type "DELETE" to permanently delete your category.');
    if (val === "DELETE") {
      e.preventDefault();
      try {
        await deleteApi(value._id).unwrap();
        toast.success("Category deleted successfully");
        setTitle("");
      } catch (error) {
        console.log(error.data.msg);
        toast.error(error.data.msg);
      }
    }
  };

  return (
    <div className="flex">
      <StudentMenu />
      <div className="flex flex-col items-center mt-[2rem] h-[30rem] w-[70rem]  gap-[1rem] text-white">
        <div className="text-2xl">Create Category</div>
        <form onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-slate-200"
            >
              Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Category Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 text-black border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div className="mt-5">
            <Button color="green" customCSS="text-[1.2rem]">
              Create Category
            </Button>
          </div>
        </form>
        <h1 className="text-2xl mt-5">Edit / Delete Category</h1>
        <div className="flex relative gap-10 mt-5 text-lg">
          {allCategory?.AllCategories?.map((category) => (
            <div key={category._id}>
              <div
                className="border p-5 rounded-full cursor-pointer hover:bg-gray-800 hover:scale-[1.05] transition-all"
                onClick={() => setValue(category)}
              >
                {category.title}
              </div>
            </div>
          ))}
          <div className="flex">
            {value && (
              <form className="absolute top-[8rem] left-[13rem] flex flex-col border p-5 rounded-md justify-center items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Category Name"
                  value={value.title}
                  onChange={(e) =>
                    setValue((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1 mb-5 block w-[20rem] px-3 py-2 text-black border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
                />
                <div className="flex gap-10">
                  <Button
                    color="green"
                    customCSS="text-[1.2rem]"
                    onClick={updateHandler}
                  >
                    Update Category
                  </Button>
                  <Button
                    color="red"
                    customCSS="text-[1.2rem]"
                    onClick={deleteHandler}
                  >
                    Delete Category
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageCategory;
