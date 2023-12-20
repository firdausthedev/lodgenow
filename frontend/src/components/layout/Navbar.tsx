import React from "react";
import SearchInput from "./SearchInput";
import { FaCartShopping } from "react-icons/fa6";
const Navbar = () => {
  return (
    <nav className="p-2 bg-gray-300">
      <div className="max-w-[800px] mx-auto flex justify-between">
        <div className="flex gap-2">
          <h1 className="font-bold md:text-xl dark:text-white">lodgenow</h1>
          <SearchInput />
        </div>
        <div className="flex gap-2">
          <a href="/signin" className="font-normal font-secondary">
            Login
          </a>
          <a href="/register" className="font-normal font-secondary">
            Signup
          </a>
          <button className="font-normal font-secondary" onClick={() => {}}>
            <FaCartShopping />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
