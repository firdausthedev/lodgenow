import React from "react";
import { clearSearchTerm } from "../../store/slices/searchSlice";
import { useDispatch } from "react-redux";

type ButtonProps = {
  type: string;
  currentType: string;
  setType: (type: string) => void;
  setCurrentPage: (page: number) => void;
};

const TypeButton = ({
  type,
  currentType,
  setType,
  setCurrentPage,
}: ButtonProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setType(type);
    setCurrentPage(1);
    dispatch(clearSearchTerm());
  };

  return (
    <li>
      <button
        className={`w-full text-start rounded-lg p-2 text-sm border capitalize text-gray-500 font-medium ${
          currentType === type && "bg-accent text-white"
        } `}
        onClick={handleClick}>
        {type === "" ? "All" : type}
      </button>
    </li>
  );
};

const SideNav = ({ type, setType, setCurrentPage }) => {
  return (
    <div className="w-40">
      <ul className="w-full flex flex-col gap-2">
        <TypeButton
          type=""
          currentType={type}
          setType={setType}
          setCurrentPage={setCurrentPage}
        />
        <TypeButton
          type="CITY"
          currentType={type}
          setType={setType}
          setCurrentPage={setCurrentPage}
        />
        <TypeButton
          type="RURAL"
          currentType={type}
          setType={setType}
          setCurrentPage={setCurrentPage}
        />
        <TypeButton
          type="MOUNTAIN"
          currentType={type}
          setType={setType}
          setCurrentPage={setCurrentPage}
        />
        <TypeButton
          type="TROPICAL"
          currentType={type}
          setType={setType}
          setCurrentPage={setCurrentPage}
        />
      </ul>
    </div>
  );
};

export default SideNav;
