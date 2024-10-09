import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../../components/Button";
import { toast } from "react-toastify";

const AddCourseContent = ({ setContent, setShowContent }) => {
  const [formData, setFormData] = useState({
    title: "",
    time: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.title.trim() === "") return;
    try {
      setShowContent(false);
      setContent((prev) => [...prev, formData.title]);
      toast.success("Content Details uploaded successfully");
    } catch (error) {
      console.log(error?.data?.Error);
      toast.error(error?.data?.Error);
    }
  };

  return (
    <div className="text-white bg-slate-900 fixed inset-0 bg-blur-lg bg-opacity-50">
      <div className="absolute bg-slate-900 p-10 pb-5 left-[20rem] top-[10rem] border-2 border-white rounded-md">
        <h1 className="text-lg mb-5">Add Content Details</h1>
        <form onSubmit={submitHandler}>
          <RxCross2
            className="absolute top-5 right-5 text-3xl font-extrabold duration-150 ease-in-out hover:opacity-80 cursor-pointer"
            onClick={() => setShowContent(false)}
          />
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
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 text-black border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <Button color="green">Upload</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseContent;
