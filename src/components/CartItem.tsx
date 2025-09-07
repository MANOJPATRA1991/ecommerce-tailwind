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
  const { id, thumbnail, title, price, discountPrice, discountPercentage = 0 } = item;
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={thumbnail} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <div
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              // to={`/product/${id}`}
            >
              {title}
            </div>
            <div onClick={() => dispatch(removeAllFromCart({ id, price: discountPrice }))} className="text-xl cursor-pointer">
              {/* <IoMdClose className="text-gray-500 hover:text-red-500 transition" /> */}
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                onClick={() => dispatch(removeFromCart({ id, price: discountPrice }))}
                className="flex-1 flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="flex-1 h-full flex justify-center items-center px-2">
                {quantity}
              </div>
              <div
                onClick={() => dispatch(addToCart({ id, price: discountPrice }))}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-1">
              {discountPercentage > 0 ? (
                <>
                  <div className="text-green-600 font-semibold">${discountPrice.toFixed(2)}</div>
                  <div className="text-xs text-gray-400 line-through">${price.toFixed(2)}</div>
                  <div className="text-xs bg-red-500 text-white px-1 rounded">
                    {discountPercentage}% OFF
                  </div>
                </>
              ) : (
                <div className="text-gray-800 font-semibold">${price.toFixed(2)}</div>
              )}
            </div>
            <div className="flex-1 flex justify-center items-center text-primary font-medium">
              $ {parseFloat(`${discountPrice * quantity}`).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
