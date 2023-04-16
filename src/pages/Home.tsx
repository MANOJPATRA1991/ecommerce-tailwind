import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Product from "../components/Product";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts } from "../slices/products-slice";

const Home = () => {
  const productIds = useAppSelector((state) => state.products.ids);
  const products = useAppSelector((state) => state.products.entities);
  const productsExist = !!productIds.length;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsExist) {
      dispatch(fetchProducts());
    }
  }, []);

  const filteredProductIds = productIds.filter((id) => {
    return (
      products[id].category === "men's clothing" ||
      products[id].category === "women's clothing"
    );
  });

  if (productsExist) {
    return (
      <div>
        <Hero />
        <section className="py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {filteredProductIds.map((productId) => {
                return (
                  <Product key={productId} product={products[productId]} />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
};

export default Home;
