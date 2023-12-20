import React from "react";
import SearchInput from "./SearchInput";
import { FaCartShopping } from "react-icons/fa6";
const Navbar = () => {
  return (
    <nav className="p-5 bg-gray-300">
      <div className="container flex justify-between">
        <div className="flex gap-5  items-center">
          <a href="/">
            <h1 className="font-bold text-xl font-primary">lodgenow</h1>
          </a>
          <SearchInput />
        </div>
        <div className="flex gap-2 items-center">
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
