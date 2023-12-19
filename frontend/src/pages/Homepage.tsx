import React, { useState } from "react";
import {
  useGetAllPropertyQuery,
  useSearchProperty,
} from "../store/api/propertyApi";
import SearchInput from "../components/SearchInput";
import PropertyList from "../components/Property/PropertyList";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../store/slices/searchSlice";

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchTerm = useSelector(selectSearchTerm);
  const limit = 5;

  const { isLoading, isError, data } = useGetAllPropertyQuery([
    limit,
    currentPage,
  ]);

  const { result: searchResult } = useSearchProperty(searchTerm);

  return (
    <div>
      <div className="max-w-[800px] mx-auto">
        <div className="mt-3">
          <SearchInput />
        </div>
      </div>
      <PropertyList
        data={data}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={isError}
        searchResult={searchResult}
      />
    </div>
  );
};

export default Homepage;
