import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "../components/CartItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleSidebar } from "../slices/sidebar-slice";
import { clearCart } from "../slices/cart-slice";

const Sidebar = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const cart = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.products.entities);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({cart.totalItems})
        </div>
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
        {cart.items.map((item) => {
          const product = products[item.id];
          return (
            <CartItem item={product} key={item.id} quantity={item.quantity} />
          );
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>${" "}
            {Math.abs(cart.totalAmount).toFixed(2)}
          </div>
          <div
            onClick={() => dispatch(clearCart())}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          View cart
        </Link>
        <Link
          to={"/"}
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
