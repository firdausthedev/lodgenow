import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ClientLayout = ({ children }) => {
  const hiddenWrapperPaths = ["/signin", "/register"];

  const Wrapper = ({
    component: Component,
    hiddenPaths,
  }: {
    component: React.ElementType;
    hiddenPaths: string[];
  }) => {
    const location = useLocation();
    const isHidden = hiddenPaths.includes(location.pathname);
    return !isHidden && <Component />;
  };
  return (
    <>
      <Wrapper component={Navbar} hiddenPaths={hiddenWrapperPaths} />
      <div className="min-h-screen">{children}</div>
      <Wrapper component={Footer} hiddenPaths={hiddenWrapperPaths} />
    </>
  );
};

export default ClientLayout;
