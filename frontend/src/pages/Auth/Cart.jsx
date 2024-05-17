import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col h-[30rem]">
      <h1 className="text-white text-3xl font-bold">Your Cart is Empty!</h1>
      <Button color="green" onClick={() => navigate("/courses")}>
        Shop Now
      </Button>
    </div>
  );
};

export default Cart;
