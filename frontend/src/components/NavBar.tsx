import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="flex justify-around w-full py-4 bg-gray-50 sticky top-0 z-[999]">
      <div className="flex items-center">
        <h3 className="text-2xl font-extrabold text-[#004AAD]">
          <Link to="/">React With Nest</Link>
        </h3>
      </div>
      <div className="items-center space-x-3 hidden md:flex">
        <>
          <Link
            to="/login"
            className="px-4 py-2 text-white font-bold bg-[#004AAD] text-center hover:bg-blue-500 cursor-pointer rounded-md"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-white font-bold bg-gray-800 text-center hover:bg-gray-600 cursor-pointer rounded-md"
          >
            Sign up
          </Link>
        </>
      </div>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineMenu size={20} style={{ color: "black" }} />
        ) : (
          <AiOutlineClose size={20} style={{ color: "black" }} />
        )}
      </div>

      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray bg-white ease-in-out duration-500 md:hidden"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="text-2xl font-bold text-[#004AAD] m-8">
          React with Nest
        </h1>
        <ul className="p-4 mt-20">
          <li className="p-4 border-b border-gray-600">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
