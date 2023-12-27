import React from "react";
import { useGetAllBookingQuery } from "../../../store/api/bookingApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import BookingList from "../../../components/Booking/BookingList";

const BookingPage = () => {
  const { token } = useSelector(selectUser);

  const {
    data: booking,
    error,
    isLoading,
    isError,
  } = useGetAllBookingQuery(token);

  if (isLoading) {
    return (
      <main className="container mt-10 mx-auto flex justify-center">
        <Spinner />
      </main>
    );
  }

  if (isError || !booking) {
    if (error) {
      return (
        <main className="container mt-3">
          <p className="text-base">
            Please login to your account to view your orders.
          </p>
        </main>
      );
    } else {
      return (
        <main className="container mt-10 mx-auto flex justify-center">
          <p className="text-base">{SERVER_ERROR_MSG}</p>
        </main>
      );
    }
  }

  return (
    <main className="container my-12">
      <h1 className="text-3xl font-semibold">Order list</h1>
      <BookingList bookings={booking.data} />
    </main>
  );
};

export default BookingPage;
