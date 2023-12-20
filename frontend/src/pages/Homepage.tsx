import React, { useState } from "react";
import {
  useGetAllPropertyQuery,
  useSearchProperty,
} from "../store/api/propertyApi";
import PropertyList from "../components/Property/PropertyList";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../store/slices/searchSlice";
import SideNav from "../components/layout/SideNav";
import Navbar from "../components/layout/Navbar";

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchTerm = useSelector(selectSearchTerm);
  const [type, setType] = useState("");
  const limit = 5;

  const { isLoading, isError, data } = useGetAllPropertyQuery([
    limit,
    currentPage,
    type,
  ]);

  const { result: searchResult } = useSearchProperty(searchTerm);

  return (
    <>
      <Navbar />
      <div className="flex container mx-auto py-5">
        <SideNav
          type={type}
          setType={setType}
          setCurrentPage={setCurrentPage}
        />
        <PropertyList
          data={data}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          isError={isError}
          searchResult={searchResult}
        />
      </div>
    </>
  );
};

export default Homepage;
