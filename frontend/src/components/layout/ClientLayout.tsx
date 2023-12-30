import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ClientLayout = ({ children }) => {
  const hiddenNavbarPaths = ["/signin", "/register"];

  const NavbarWrapper = () => {
    const location = useLocation();
    const isNavbarHidden = hiddenNavbarPaths.includes(location.pathname);
    return !isNavbarHidden && <Navbar />;
  };

  const FooterWrapper = () => {
    const location = useLocation();
    const isNavbarHidden = hiddenNavbarPaths.includes(location.pathname);
    return !isNavbarHidden && <Footer />;
  };
  return (
    <>
      <NavbarWrapper />
      <div className="min-h-screen">{children}</div>
      <FooterWrapper />
    </>
  );
};

export default ClientLayout;
