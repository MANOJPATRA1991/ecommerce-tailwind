import React, { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleSidebar } from "../slices/sidebar-slice";
import { toggleFilterSidebar } from "../slices/filter-sidebar-slice";
import Logo from "../img/logo.svg";
import { FaFilter } from "react-icons/fa";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to="/">
          <img className="w-[40px]" src={Logo} alt="" />
        </Link>
        <div
          className="cursor-pointer flex relative"
          onClick={() => dispatch(toggleSidebar())}
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {cart.totalItems}
          </div>
        </div>
        <button
          className="fixed top-20 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-50"
          onClick={() => dispatch(toggleFilterSidebar())}
        >
          <FaFilter size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
