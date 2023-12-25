import React from "react";
import { clearSearchTerm } from "../../store/slices/searchSlice";
import { useDispatch } from "react-redux";

const SideNav = ({ type, setType, setCurrentPage }) => {
  const dispatch = useDispatch();

  type ButtonProps = {
    type: string;
    currentType: string;
    setType: (type: string) => void;
  };

  const TypeButton = ({ type, currentType, setType }: ButtonProps) => {
    const handleClick = () => {
      setType(type);
      setCurrentPage(1);
      dispatch(clearSearchTerm());
    };

    return (
      <li>
        <button
          className={`font-secondary w-full text-start rounded-lg p-2 text-sm border capitalize text-gray-500 font-medium ${
            currentType === type && "bg-accent-100 text-white"
          } `}
          onClick={handleClick}>
          {type === "" ? "All" : type}
        </button>
      </li>
    );
  };
  return (
    <div className="w-40">
      <ul className="w-full flex flex-col gap-2">
        <TypeButton type="" currentType={type} setType={setType} />
        <TypeButton type="CITY" currentType={type} setType={setType} />
        <TypeButton type="RURAL" currentType={type} setType={setType} />
        <TypeButton type="MOUNTAIN" currentType={type} setType={setType} />
        <TypeButton type="TROPICAL" currentType={type} setType={setType} />
      </ul>
    </div>
  );
};

export default SideNav;
