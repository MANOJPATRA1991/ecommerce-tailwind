import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { useAppDispatch } from "../hooks";
import { addToCart, removeAllFromCart, removeFromCart } from "../slices/cart-slice";

type TProps = {
  item: Product;
  quantity: number;
};

const CartItem = ({ item, quantity }: TProps) => {
  const dispatch = useAppDispatch();
  const { id, image, title, price } = item;
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <div
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              // to={`/product/${id}`}
            >
              {title}
            </div>
            <div onClick={() => dispatch(removeAllFromCart({ id, price }))} className="text-xl cursor-pointer">
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                onClick={() => dispatch(removeFromCart({ id, price }))}
                className="flex-1 flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="flex-1 h-full flex justify-center items-center px-2">
                {quantity}
              </div>
              <div
                onClick={() => dispatch(addToCart({ id, price }))}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around">
              $ {price}
            </div>
            <div className="flex-1 flex justify-center items-center text-primary font-medium">
              $ {parseFloat(`${price * quantity}`).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
