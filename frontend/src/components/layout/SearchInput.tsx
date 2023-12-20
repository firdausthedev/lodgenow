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
        <FaMagnifyingGlass className="text-sm" />
      </div>
      <input
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        autoComplete="off"
        className="block w-64 p-2 pl-7 text-sm font-secondary font-normal text-gray-500 rounded-lg shadow-md border "
        placeholder="Search for property"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="p-2 text-white rounded-lg absolute right-2.5 top-2 px-2 py-1 bg-black font-normal text-xs font-secondary outline-none">
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchInput;
