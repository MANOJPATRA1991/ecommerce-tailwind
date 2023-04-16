import React from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../slices/cart-slice";
import { useAppDispatch, useAppSelector } from "../hooks";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.entities);

  if (!id || !products[id]) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { title, price, description, image } = products[id];

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-sm" src={image} alt="" />
          </div>
          <div className="flex flex-1 flex-col text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => dispatch(addToCart({ id, price }))}
              className="bg-primary py-4 px-8 text-white w-max self-center lg:self-auto"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
