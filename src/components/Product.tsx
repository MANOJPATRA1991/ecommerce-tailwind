import React from "react";
import { BsEyeFill, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../slices/cart-slice";
import Rating from "./Rating";

type TProps = {
  product: Product;
};

const Product = ({ product }: TProps) => {
  const dispatch = useAppDispatch();
  const { id, image, category, title, price, rating } = product;

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="relative overflow-hidden group transition">
        <div className="w-full flex justify-center items-center">
          <img
            className="max-h-[160px] group-hover:scale-110 transition duration-300"
            src={image}
            alt={title}
          />
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => dispatch(addToCart({ id, price }))}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500 rounded-full">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="bg-gray-200 text-gray-700 text-xs font-semibold py-1 px-3 rounded-full inline-block mb-2">
          {category}
        </div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold text-lg mb-1">{title}</h2>
        </Link>
        <div className="text-red-500 font-semibold text-lg mb-1 inline-block">${price}</div>
        <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
          <Rating rate={rating?.rate} />
        </div>
      </div>
    </div>
  );
};

export default Product;
