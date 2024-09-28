import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useUploadMutation } from "../../redux/api/usersApiSlice";
import { timeout } from "nodemon/lib/config";

const AddCourseSubContent = ({
  setShowSubContent,
  setContent,
  contentIndex,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: "",
    time: "",
  });
  const [uploadApi] = useUploadMutation();

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     try {
  //       setShowSubContent(false);
  //       setSubContentDetails((prev) => [...prev, formData]);
  //       toast.success("Video Details uploaded successfully");
  //     } catch (error) {
  //       console.log(error, error.message);
  //       toast.error("Can't upload video at this time. Try again later!");
  //     }
  //   };

  const submitHandler = async (e) => {
    if (formData.title.trim() === "") return;
    e.preventDefault();
    try {
      setShowSubContent(false);
      setContent((prev) => {
        const updatedDetails = [...prev];
        if (updatedDetails[contentIndex]?.subContent?.length >= 0) {
          updatedDetails[contentIndex]?.subContent?.push(formData);
          return updatedDetails;
        }
        const updatedContent = { title: updatedDetails[contentIndex] };
        updatedContent.subContent = [];
        updatedContent.subContent.push(formData);
        updatedDetails[contentIndex] = updatedContent;
        return updatedDetails;
      });
      toast.success("Video Details uploaded successfully");
    } catch (error) {
      console.log(error, error.message);
      toast.error("Can't upload video at this time. Try again later!");
    }
  };

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function videoHandler(e) {
    setIsLoading(true);
    try {
      const res = await uploadApi(e.target.files[0]).unwrap();
      toast.success(res?.message);
      setFormData((prev) => {
        return { ...prev, video: res.file, time: res.duration };
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setIsLoading(false);
  }
  return (
    <div className="text-white bg-slate-900 fixed inset-0 bg-blur-lg bg-opacity-50">
      <div className="absolute bg-slate-900 p-10 pb-5 left-[20rem] top-[3rem] border-2 border-white rounded-md">
        <h1 className="text-lg mb-5">Add Video Details</h1>
        <form onSubmit={submitHandler}>
          <RxCross2
            className="absolute top-5 right-5 text-3xl font-extrabold duration-150 ease-in-out hover:opacity-80 cursor-pointer"
            onClick={() => setShowSubContent(false)}
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
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[50rem] px-3 py-2 text-black border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
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
              className="mt-1 mb-5 block w-full h-[10rem] px-3 text-black py-2 resize-none border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            ></textarea>
          </div>
          <div className="flex gap-10">
            <div>
              <label
                htmlFor="video"
                className="block text-md font-medium text-slate-200"
              >
                Video
              </label>
              <input
                type="file"
                name="video"
                accept=".mp4"
                onChange={videoHandler}
                className="mt-1 mb-5 block border-2 rounded-md text-md
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
              />
            </div>
            {isLoading ? (
              <div className="mt-1">
                <Loader />
              </div>
            ) : (
              <video src={formData?.video} className="w-[5rem]" />
            )}
          </div>
          <div>
            <Button color="green">Upload</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseSubContent;
