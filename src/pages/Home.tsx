import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Product from "../components/Product";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts, updateFilteredProducts } from "../slices/products-slice";

const Home = () => {
  const filteredProductIds = useAppSelector((state) => state.products.filteredProductIds);
  const products = useAppSelector((state) => state.products.entities);
  const productsExist = filteredProductIds.length > 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(updateFilteredProducts());
  }, [products, dispatch]);

  if (productsExist) {
    return (
      <div>
        <Hero />
        <section className="py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {filteredProductIds.map((productId) => (
                <Product key={productId} product={products[productId]} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
};

export default Home;
