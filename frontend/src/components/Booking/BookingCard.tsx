import React, { useState, useEffect } from "react";
import { Property } from "./../../store/types";
import DateInput from "../Input/DateInput";
import { useCreateBookingMutation } from "../../store/api/bookingApi";
import { useDispatch, useSelector } from "react-redux";
import { selectBooking, setError } from "../../store/slices/bookingSlice";
import { selectUser } from "../../store/slices/userSlice";
import { SERVER_ERROR_MSG } from "../utils/constants";
import { selectCart, setTotal } from "../../store/slices/cartSlice";

interface ErrorResponse {
  status: number;
  data: {
    errors?: inputValidationError[];
    message: string;
    success: false;
  };
}

interface inputValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

const BookingCard = ({ property }: { property: Property }) => {
  const [createBooking] = useCreateBookingMutation();
  const { token } = useSelector(selectUser);
  const { checkInDate, checkOutDate } = useSelector(selectBooking);
  const { error } = useSelector(selectBooking);
  const { total } = useSelector(selectCart);
  const dispatch = useDispatch();

  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    return () => {
      // Cleanup function: dispatch action to reset the error
      dispatch(setError(""));
    };
  }, [dispatch]);

  const handleBookingClick = async () => {
    try {
      const result = await createBooking({
        token,
        checkInDate,
        checkOutDate,
        propertyId: property.id,
      });

      if ("error" in result) {
        const errorResponse = result.error as ErrorResponse;
        if (errorResponse.data.errors) {
          dispatch(setError(errorResponse.data.errors[0].msg));
        } else {
          if (errorResponse.data.message === "Unauthorized: Invalid token") {
            dispatch(setError("You need to login to add in cart"));
          } else {
            dispatch(setError(errorResponse.data.message));
          }
        }
      }
      if ("data" in result) {
        dispatch(setTotal(total + 1));
        setSuccessMsg("Added in cart");
        setTimeout(() => {
          setSuccessMsg("");
        }, 1500);
      }
    } catch (error) {
      dispatch(setError(SERVER_ERROR_MSG));
    }
  };

  return (
    <div className="mt-8 w-[40rem] h-fit bg-white border shadow-lg rounded-lg p-6">
      <h3 className="font-primary font-medium text-3xl">
        ${property.price}
        <span className="font-light text-xl"> night</span>
      </h3>
      <DateInput />
      <p className="font-secondary text-red-500 mt-3">{error}</p>
      <p className="font-secondary text-green-500 mt-3">{successMsg}</p>
      <button
        onClick={handleBookingClick}
        className="p-4 bg-accent w-full rounded-md text-white text-xs mt-4 hover:bg-accent-100 
        transition-colors duration-150 ease-in-out font-secondary uppercase">
        Add to cart
      </button>
    </div>
  );
};

export default BookingCard;
