import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import {
  usePurchaseCourseMutation,
  useShowPurchasedCoursesQuery,
} from "../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [discount, setDiscount] = useState(0);

  const { data, refetch } = useShowPurchasedCoursesQuery(userInfo._id);
  const [purchaseApi] = usePurchaseCourseMutation();

  let { cartItems } = useSelector((state) => state.cart);

  if (data?.length > 0) {
    let itemsToRemove = cartItems.filter((cartItem) =>
      data.some((item) => item._id === cartItem._id)
    );

    cartItems = cartItems.filter((cartItem) =>
      data.every((item) => item._id !== cartItem._id)
    );

    itemsToRemove.forEach((cartItem) => {
      dispatch(removeFromCart(cartItem._id));
    });
  }

  useEffect(() => {
    refetch();
    cartItems.length >= 5
      ? setDiscount(50)
      : setDiscount(cartItems?.length * 10);
  }, [data, refetch, cartItems]);

  const boughtHandler = async (courseIds) => {
    try {
      const res = await purchaseApi({
        userId: userInfo._id,
        courseId: courseIds,
      }).unwrap();
      dispatch(clearCart());
      refetch();
      toast.success(res);
    } catch (error) {
      console.log(error?.error);
      toast.error(error?.error);
    }
  };

  const cost = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  const totalCost = cost - cost * (discount / 100);

  return (
    <>
      <div className="flex justify-around items-start wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center flex-col h-[30rem]">
            <h1 className="text-white text-3xl font-bold">
              Your Cart is Empty!
            </h1>
            <Button
              color="green"
              customCSS="text-xl"
              onClick={() => navigate("/courses")}
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4 text-white">Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-enter mb-[1rem] pb-2 justify-between"
                >
                  <div
                    className="flex cursor-pointer"
                    onClick={() => navigate(`/course/${item._id}`)}
                  >
                    <div className="w-[18rem] h-[10rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 ml-4 text-lg text-white">
                      {item.name}

                      <div className="mt-2 text-white">{item.teacherName}</div>
                      <div className="mt-2 text-white font-bold">
                        $ {item.price}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="text-red-500 mr-[5rem] hover:text-red-600"
                      onClick={() => {
                        dispatch(removeFromCart(item._id));
                      }}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem] text-xl" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8">
                <div className="p-4 rounded-lg">
                  <div className="text-xl text-white mb-1">
                    SubTotal: ${cost}
                  </div>
                  <div className="text-xl text-white mb-5">
                    Discount: {discount}% ($
                    {(cost * (discount / 100)).toFixed(2)})
                  </div>
                  <div className="text-2xl font-bold text-white">
                    Total: ${totalCost}
                  </div>
                  <div className="w-[27rem] text-white border relative right-[-43rem] top-[-7rem] p-5 rounded-lg">
                    <h1 className="text-xl">Our Discount Policy:</h1>
                    <h2>
                      1 course = 10% discount, multiplied by the number of
                      courses.
                    </h2>
                    <h2>5 or more courses = 50% discount.</h2>
                  </div>
                  <div className="w-full flex justify-between mt-[-5rem]">
                    <Button
                      color="green"
                      onClick={() =>
                        boughtHandler(cartItems.map((item) => item._id))
                      }
                      customCSS="text-xl"
                      width
                    >
                      Proceed to checkout
                    </Button>
                    <Button
                      color="red"
                      onClick={() => {
                        dispatch(clearCart());
                      }}
                      customCSS="text-xl ml-[22rem]"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
