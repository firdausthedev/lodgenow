import React from "react";
import SearchInput from "./SearchInput";

import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../store/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cart from "./Cart";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, role } = useSelector(selectUser);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigateTo("/");
  };

  const SearchInputWrapper = () => {
    const location = useLocation();
    const showSearchInputPaths = ["/"];
    const isSearchInputShow = showSearchInputPaths.includes(location.pathname);

    return isSearchInputShow && <SearchInput />;
  };

  return (
    <nav className="p-5 bg-white border-b">
      <div className="container flex justify-between">
        <div className="flex gap-5 items-center">
          <button onClick={() => navigateTo("/")}>
            <h1 className="font-semibold text-2xl font-secondary text-accent">
              lodgenow
            </h1>
          </button>
        </div>
        <SearchInputWrapper />

        <div className="flex gap-2 items-center">
          {token && role === "user" && (
            <div className="flex gap-2">
              <Link
                to="/booking"
                className="font-normal bg-accent-200 text-white py-1 px-3 rounded-md text-sm">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="font-normal bg-accent text-white py-1 px-3 rounded-md text-sm">
                Logout
              </button>
            </div>
          )}
          {!(token && role === "user") && (
            <div className="flex gap-2">
              <Link
                to="/signin"
                className="font-normal bg-accent text-white py-1 px-3 rounded-md text-sm">
                Login
              </Link>
              <Link
                to="/register"
                className="font-normal border border-accent text-accent  py-1 px-3 rounded-md text-sm">
                Signup
              </Link>
            </div>
          )}
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
