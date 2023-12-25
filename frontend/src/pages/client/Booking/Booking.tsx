import React from "react";
import { useGetAllBookingQuery } from "../../../store/api/bookingApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import { Booking } from "../../../store/types";

interface BookingErrorResponse {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}

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
          <p className="font-secondary text-base">
            Please login to your account to view your orders.
          </p>
        </main>
      );
    } else {
      return (
        <main className="container mt-10 mx-auto flex justify-center">
          <p className="font-secondary text-base">{SERVER_ERROR_MSG}</p>
        </main>
      );
    }
  }

  const OrderList = ({ booking }: { booking: Booking[] }) => {
    if (booking.length === 0) {
      return (
        <div>
          <p className="text-base font-secondary">You have no orders..</p>
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-12 border-b pb-4 mt-4 font-primary">
          <div className="col-span-1">
            <th>#</th>
          </div>
          <div className="col-span-5">
            <th>ORDER NUMBER</th>
          </div>
          <div className="col-span-4">
            <th>STATUS</th>
          </div>
          <div className="col-span-2 ">
            <th>ACTIONS</th>
          </div>
        </div>
        {booking.map((booking, index) => {
          return (
            <div
              key={booking.id}
              className="grid grid-cols-12 border-b py-4 mt-4 font-secondary">
              <div className="col-span-1">
                <td>{index + 1}</td>
              </div>
              <div className="col-span-5">
                <td>{booking.id}</td>
              </div>
              <div className="col-span-4">
                <td>{booking.payment ? booking.payment.status : "PENDING"}</td>
              </div>
              <div className="col-span-2">
                <td>
                  <button className="bg-accent-200 text-sm text-white rounded-md px-4 py-1">
                    View
                  </button>
                </td>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="container my-12">
      <h1 className="font-primary text-3xl font-semibold">Order list</h1>
      <OrderList booking={booking.data} />
    </main>
  );
};

export default BookingPage;
