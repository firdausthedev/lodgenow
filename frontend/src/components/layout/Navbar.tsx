import React from "react";
import SearchInput from "./SearchInput";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { clearUserToken, selectUser } from "../../store/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(clearUserToken());
  };

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
          {token && (
            <button
              onClick={handleLogout}
              className="font-normal font-secondary">
              logout
            </button>
          )}
          {!token && (
            <div className="flex gap-2">
              <a href="/signin" className="font-normal font-secondary">
                Login
              </a>
              <a href="/register" className="font-normal font-secondary">
                Signup
              </a>
            </div>
          )}

          <button className="font-normal font-secondary" onClick={() => {}}>
            <FaCartShopping />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
