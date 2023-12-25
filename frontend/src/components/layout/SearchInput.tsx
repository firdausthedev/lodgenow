import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
  clearSearchTerm,
} from "../../store/slices/searchSlice";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
      <div className="absolute top-3 left-0 flex items-center pl-2 pointer-events-none">
        <div className="bg-accent rounded-full p-[0.35rem] w-6 h-6 flex justify-center items-center">
          <FaMagnifyingGlass className="text-base text-white" />
        </div>
      </div>
      <input
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        autoComplete="off"
        className="block w-72 px-2 py-3 pl-10 text-sm font-secondary font-normal text-gray-500 rounded-full caret-accent outline-accent shadow-md border appearance-none"
        placeholder="Search for property name"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="text-white rounded-lg absolute right-2.5 top-3 px-2 py-1 bg-accent-200 font-normal text-xs font-secondary outline-accent-600">
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchInput;
