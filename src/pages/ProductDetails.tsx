import React from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../slices/cart-slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import Rating from "../components/Rating";

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

  const { title, price, description, thumbnail, rating, category, discountPrice, discountPercentage = 0 } = products[id];

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-sm" src={thumbnail} alt={title} />
          </div>
          <div className="flex flex-1 flex-col text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="bg-gray-200 text-gray-700 text-sm font-semibold py-1 px-3 rounded-full w-max mb-2 mx-auto lg:mx-0">
              {category}
            </div>
            <div className="flex items-center gap-3 mb-4">
              {discountPercentage > 0 ? (
                <>
                  <div className="text-2xl text-green-600 font-bold">${discountPrice.toFixed(2)}</div>
                  <div className="text-lg text-gray-500 line-through">${price}</div>
                  <div className="bg-red-500 text-white text-sm font-semibold py-1 px-2 rounded">
                    {discountPercentage}% OFF
                  </div>
                </>
              ) : (
                <div className="text-2xl text-gray-800 font-bold">${price}</div>
              )}
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Rating rate={rating} />
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => dispatch(addToCart({ id, price: discountPrice }))}
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
