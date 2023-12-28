import React from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavBar";

const AdminLayout = ({ children }) => {
  const NavbarWrapper = () => {
    const location = useLocation();
    const hiddenNavbarPaths = ["/admin"];
    const isNavbarHidden = hiddenNavbarPaths.includes(location.pathname);

    return !isNavbarHidden && <AdminNavbar />;
  };
  return (
    <div className="flex">
      <NavbarWrapper />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
