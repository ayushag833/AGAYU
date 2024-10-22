import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useUploadMutation,
} from "../../redux/api/usersApiSlice";
import { userInformation } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";

const Profile = () => {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails?.userInfo;

  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    image: user?.image,
    gender: user?.gender,
    address: user?.address,
    dateOfBirth: user?.dateOfBirth,
    bio: user?.bio,
  });

  const dispatch = useDispatch();
  const [updateApi] = useUpdateUserMutation();
  const [uploadApi] = useUploadMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateApi({
        id: user._id,
        ...formData,
      }).unwrap();
      dispatch(userInformation(res));
      toast.success("User updated successfully");
    } catch (error) {
      console.log(error?.data?.Error);
      toast.error(error?.data?.Error);
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
      dispatch(userInformation({ ...user, image: res.file }));
      setFormData((prev) => {
        return { ...prev, image: res.file };
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <div className="flex justify-center mt-[2rem]">
      <form className="ml-[5rem] mt-10" onSubmit={submitHandler}>
        <div className="mb-10 flex gap-10">
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-slate-200"
            >
              Profile Picture
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
          <img
            src={
              user?.image ||
              "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png"
            }
            className="w-[5rem] bg-slate-50 object-cover object-top"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-slate-200"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-200"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-slate-200"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            >
              <option value="" disabled>
                Select your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-slate-200"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-slate-200"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Enter Date of Birth"
              value={formData.dateOfBirth}
              onChange={changeHandler}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
         focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
         invalid:border-red-500 invalid:text-red-600
         focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </div>
        </div>
        <div className="mt-5">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-slate-200"
          >
            Bio
          </label>
          <textarea
            type="text"
            name="bio"
            placeholder="Enter Bio"
            value={formData.bio}
            onChange={changeHandler}
            className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 resize-none border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
          ></textarea>
        </div>
        <div className="mt-5">
          <Button color="green">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
