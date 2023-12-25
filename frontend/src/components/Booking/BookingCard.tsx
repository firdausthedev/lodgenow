import React from "react";
import { Property } from "./../../store/types";
import DateInput from "../Input/DateInput";

const BookingCard = ({ property }: { property: Property }) => {
  return (
    <div className="mt-8 w-[40rem] h-fit bg-white border shadow-lg rounded-lg p-6">
      <h3 className="font-primary font-medium text-3xl">
        ${property.price}
        <span className="font-light text-xl"> night</span>
      </h3>
      <DateInput />
      <button className="p-4 bg-accent w-full rounded-md text-white mt-4 hover:bg-accent-100 transition-colors duration-150 ease-in-out font-secondary">
        Add to cart
      </button>
    </div>
  );
};

export default BookingCard;
