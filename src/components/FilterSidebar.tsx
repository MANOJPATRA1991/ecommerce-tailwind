import React, { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFilters, updateFilteredProducts } from "../slices/products-slice";
import { toggleFilterSidebar } from "../slices/filter-sidebar-slice";

const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.filterSidebar.isOpen);
  const filters = useAppSelector((state) => state.products.filters);

  const [category, setCategory] = useState(filters.category);
  const [rating, setRating] = useState(filters.rating);
  const [sortOrder, setSortOrder] = useState(filters.sortOrder);

  const categories = ["men's clothing", "women's clothing"];

  const applyFilters = () => {
    dispatch(setFilters({ category, rating, sortOrder }));
    dispatch(updateFilteredProducts());
    dispatch(toggleFilterSidebar());
  };

  const resetFilters = () => {
    setCategory("all");
    setRating(0);
    setSortOrder("asc");
    dispatch(setFilters({ category: "all", rating: 0, sortOrder: "asc" }));
    dispatch(updateFilteredProducts());
    dispatch(toggleFilterSidebar());
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full fixed top-0 h-full bg-white shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Filters</div>
        <div
          onClick={() => dispatch(toggleFilterSidebar())}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      <div className="flex flex-col gap-y-4 py-4 h-[520px] lg:h-[640px] overflow-y-auto border-b">
        <div>
          <h3 className="text-sm font-semibold mb-2">Category</h3>
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Rating</h3>
          <select
            className="w-full p-2 border rounded"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="0">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Sort By</h3>
          <select
            className="w-full p-2 border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <button
          className="bg-primary text-white py-4 w-full"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button
          className="bg-gray-200 text-primary py-4 w-full flex items-center justify-center"
          onClick={resetFilters}
        >
          <FiTrash2 className="mr-2" /> Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
