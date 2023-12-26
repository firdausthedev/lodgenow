import React from "react";
import SearchInput from "./SearchInput";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { clearUserToken, selectUser } from "../../store/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(clearUserToken());
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
          <a href="/">
            <h1 className="font-semibold text-2xl font-secondary text-accent">
              lodgenow
            </h1>
          </a>
        </div>
        <SearchInputWrapper />

        <div className="flex gap-2 items-center">
          {token && (
            <div className="flex gap-2">
              <a
                href="/booking"
                className="font-normal font-secondary bg-accent-200 text-white py-1 px-3 rounded-md text-sm">
                Orders
              </a>
              <button
                onClick={handleLogout}
                className="font-normal font-secondary bg-accent text-white py-1 px-3 rounded-md text-sm">
                Logout
              </button>
            </div>
          )}
          {!token && (
            <div className="flex gap-2">
              <a
                href="/signin"
                className="font-normal font-secondary bg-accent text-white py-1 px-3 rounded-md text-sm">
                Login
              </a>
              <a
                href="/register"
                className="font-normal font-secondary border border-accent text-accent  py-1 px-3 rounded-md text-sm">
                Signup
              </a>
            </div>
          )}

          <button className="font-normal font-secondary" onClick={() => {}}>
            <FaCartShopping className="text-accent" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
