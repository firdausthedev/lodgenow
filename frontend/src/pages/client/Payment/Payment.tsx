import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { useGetAllBookingQuery } from "../../../store/api/bookingApi";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import {
  OrderItem,
  PaymentCard,
  OrderSummary,
} from "../../../components/Payment/PaymentPageItems";

const PaymentPage = () => {
  const { token } = useSelector(selectUser);
  const [isPayment, setIsPayment] = useState(false);
  const {
    data: bookings,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllBookingQuery(token, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return (
      <main className="container mt-10 mx-auto flex justify-center">
        <Spinner />
      </main>
    );
  }

  if (isError || !bookings) {
    if (error) {
      return (
        <main className="container mt-3">
          <p className="text-base">
            Please login to your account to view your cart.
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

  const bookingWithoutPayment = bookings.data.filter(
    item => item.payment === null,
  );

  return (
    <main className="bg-brown-200 min-h-screen">
      <div className="container mx-auto py-12 grid grid-cols-12 gap-5">
        <div className="bg-white rounded-lg col-span-8 h-fit py-10 px-5">
          <h1 className="font-primary text-4xl font-semibold text-center">
            {!isPayment ? "Shopping Cart" : "Payment"}
          </h1>
          <div className="flex flex-col gap-5 mt-5">
            {bookingWithoutPayment.length === 0 && (
              <p className="mt-5">No item in cart..</p>
            )}
            {!isPayment &&
              bookingWithoutPayment.length > 0 &&
              bookingWithoutPayment.map(booking => {
                return (
                  <OrderItem
                    key={booking.id}
                    booking={booking}
                    token={token}
                    refetch={refetch}
                  />
                );
              })}
            {isPayment && <PaymentCard />}
          </div>
        </div>
        <OrderSummary
          bookings={bookingWithoutPayment}
          isPayment={isPayment}
          setIsPayment={setIsPayment}
          token={token}
        />
      </div>
    </main>
  );
};

export default PaymentPage;
