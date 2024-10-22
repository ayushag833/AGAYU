import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { usePurchaseCourseMutation } from "../redux/api/usersApiSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Success = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [purchaseApi] = usePurchaseCourseMutation();

  const dispatch = useDispatch();
  let { courseIds } = useParams();
  courseIds = courseIds.split(",");

  const boughtHandler = async () => {
    try {
      const res = await purchaseApi({
        userId: userInfo._id,
        courseId: courseIds,
      }).unwrap();
      dispatch(clearCart());
      toast.success(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.error);
    }
  };

  useEffect(() => {
    boughtHandler();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col h-[30rem]">
      <h1 className="text-white text-3xl font-bold">
        🎉 Woohoo! Your Payment is successful! 🎊
      </h1>
      <h1 className="text-white mt-5 text-2xl font-bold">
        Click here to view your{" "}
        <span
          className="text-green-500 hover:underline cursor-pointer"
          onClick={() => navigate(`/profile/student/courses/${userInfo._id}`)}
        >
          courses
        </span>
      </h1>
    </div>
  );
};

export default Success;
