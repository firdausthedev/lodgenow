import React from "react";

import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigateTo("/admin");
  };

  const AdminNavItem = ({ to, title }) => {
    return (
      <Link
        to={to}
        className="font-medium text-lg font-secondary p-3 bg-brown-200 rounded-lg text-gray-600">
        {title}
      </Link>
    );
  };

  return (
    <nav className="p-5 border-b min-h-screen min-w-[17rem] border-r-2 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <Link
          to="/"
          className="font-semibold text-2xl font-secondary text-accent text-center p-5">
          lodgenow
        </Link>
        <AdminNavItem to="./dashboard" title="Dashboard" />
        <AdminNavItem to="./property" title="Property" />
        <AdminNavItem to="./agent" title="Agent" />
        <AdminNavItem to="./booking" title="Booking" />
        <AdminNavItem to="./payment" title="Payment" />
        <AdminNavItem to="./review" title="Review" />
        <AdminNavItem to="./user" title="User" />
      </div>
      <button
        onClick={handleLogout}
        className="bg-accent-100 p-4 text-white rounded-lg mb-5">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
