import React, { useState } from "react";
import { Booking } from "../../../store/types";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import {
  useDeleteBookingMutation,
  useGetAllBookingQuery,
} from "../../../store/api/bookingApi";
import { useCreatePaymentMutation } from "../../../store/api/paymentApi";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import { calculateNumberOfNights } from "../../../components/utils/booking";

const PaymentPage = () => {
  const { token } = useSelector(selectUser);
  const [isPayment, setIsPayment] = useState(false);
  const {
    data: bookings,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllBookingQuery(token);

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

  const OrderSummary = ({ bookings }: { bookings: Booking[] }) => {
    const [createPayment] = useCreatePaymentMutation();

    const totalPrice = bookings.reduce((acc, booking) => {
      const checkInDate = new Date(booking.checkIn).toISOString();
      const checkOutDate = new Date(booking.checkOut).toISOString();
      const numberOfNights = calculateNumberOfNights(checkInDate, checkOutDate);

      return acc + booking.property.price * numberOfNights;
    }, 0);

    const handleConfirmOrder = () => {
      bookings.forEach(async booking => {
        try {
          const checkInDate = new Date(booking.checkIn).toISOString();
          const checkOutDate = new Date(booking.checkOut).toISOString();
          const numberOfNights = calculateNumberOfNights(
            checkInDate,
            checkOutDate,
          );
          const amount = booking.property.price * numberOfNights;

          const result = await createPayment({
            token,
            bookingId: booking.id,
            amount,
          });
        } catch (error) {
          alert({ SERVER_ERROR_MSG });
        }
      });
      alert("Payment success");
    };

    return (
      <div className="col-span-4 text-gray-500 flex flex-col gap-5">
        <h2 className="text-center font-primary font-semibold text-3xl">
          Order Summary
        </h2>
        <div>
          <h3 className="font-primary font-medium text-lg">You are ordering</h3>
          <p className="font-light text-4xl text-black">
            {bookings.length} item(s)
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex justify-between text-lg">
            <p>Total:</p>
            <p className="text-black">${totalPrice}</p>
          </div>
          {!isPayment && (
            <button
              onClick={() => {
                setIsPayment(true);
              }}
              className="bg-accent w-full text-white py-3 rounded-lg uppercase">
              Proceed to checkout
            </button>
          )}
          {isPayment && (
            <button
              onClick={handleConfirmOrder}
              className="bg-green-600 w-full text-white py-3 rounded-lg uppercase">
              Confirm the order
            </button>
          )}
        </div>
      </div>
    );
  };

  const OrderItem = ({ booking }: { booking: Booking }) => {
    const checkInDate = new Date(booking.checkIn).toISOString();
    const checkOutDate = new Date(booking.checkOut).toISOString();
    const numberOfNights = calculateNumberOfNights(checkInDate, checkOutDate);

    const [deleteBooking] = useDeleteBookingMutation();

    const handleDelete = async () => {
      try {
        const result = await deleteBooking({
          token,
          bookingId: booking.id,
        });

        if ("data" in result) {
          refetch();
        }
      } catch (error) {
        alert({ SERVER_ERROR_MSG });
      }
    };

    return (
      <div className="flex gap-3">
        <div
          className=" w-56 shadow-md rounded-md bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url('${booking.property.photos[0]}')` }}
        />
        <div className="flex flex-col justify-between py-2 w-full gap-2">
          <h2 className="font-primary text-lg font-medium">
            {booking.property.name}
          </h2>
          <div>
            <p>
              From:
              {new Date(booking.checkIn).toISOString().split("T")[0]}
            </p>
            <p>
              Until: {new Date(booking.checkOut).toISOString().split("T")[0]}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="underline text-red-500 uppercase">
              Remove
            </button>
            <p className="font-medium">
              {numberOfNights} night(s) x ${booking.property.price}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const bookingWithoutPayment = bookings.data.filter(
    item => item.payment === null,
  );

  const PaymentCard = () => {
    return (
      <div className="mt-8 p-5 border border-blue-400 text-blue-400">
        <p>I haven&apos;t implemented the payment method.</p>
        <p>This page is only for demonstration</p>
      </div>
    );
  };

  return (
    <main className="bg-brown-200 h-[90vh]">
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
                return <OrderItem key={booking.id} booking={booking} />;
              })}
            {isPayment && <PaymentCard />}
          </div>
        </div>
        <OrderSummary bookings={bookingWithoutPayment} />
      </div>
    </main>
  );
};

export default PaymentPage;
