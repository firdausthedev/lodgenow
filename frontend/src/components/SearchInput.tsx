import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
  clearSearchTerm,
} from "../store/slices/searchSlice";

const SearchInput = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const handleInputChange = event => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchTerm());
  };
  return (
    <div className="relative">
      <div className="absolute top-4 left-0 flex items-center pl-6 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        autoComplete="off"
        className="block w-full p-4 pl-14 text-xs font-secondary font-normal text-gray-500 dark:text-white rounded-lg bg-white dark:bg-dark-blue shadow-md border "
        placeholder="Search for property"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="p-4 text-white rounded-lg absolute right-2.5 top-2 px-4 py-2 bg-black font-normal text-xs font-secondary outline-none">
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchInput;
