import React from "react";

const SideNav = ({ type, setType, setCurrentPage }) => {
  const onTypeHandler = type => {
    setType(type);
    setCurrentPage(1);
  };

  return (
    <div>
      <ul>
        <li>
          <button
            className={`${type === "" && "bg-black text-white"}`}
            onClick={() => onTypeHandler("")}>
            All
          </button>
        </li>
        <li>
          <button
            className={`${type === "CITY" && "bg-black text-white"}`}
            onClick={() => onTypeHandler("CITY")}>
            City
          </button>
        </li>
        <li>
          <button
            className={`${type === "RURAL" && "bg-black text-white"}`}
            onClick={() => onTypeHandler("RURAL")}>
            Rural
          </button>
        </li>
        <li>
          <button
            className={`${type === "MOUNTAIN" && "bg-black text-white"}`}
            onClick={() => onTypeHandler("MOUNTAIN")}>
            Mountain
          </button>
        </li>
        <li>
          <button
            className={`${type === "TROPICAL" && "bg-black text-white"}`}
            onClick={() => onTypeHandler("TROPICAL")}>
            Tropical
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
