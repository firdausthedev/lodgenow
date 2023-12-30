import React, { useState } from "react";

import { Booking } from "../../store/types";
import BookingModal from "./BookingModal";

const BookingButton = ({ bookingId }: { bookingId: string }) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <button
        className="bg-accent-200 text-sm text-white rounded-md px-4 py-1"
        onClick={() => setIsModal(true)}>
        View
      </button>
      {isModal && (
        <BookingModal bookingId={bookingId} setIsModal={setIsModal} />
      )}
    </>
  );
};

const BookingList = ({ bookings }: { bookings: Booking[] }) => {
  const bookingWithPayment = bookings.filter(
    booking => booking.payment !== null,
  );

  if (bookingWithPayment.length === 0) {
    return (
      <div>
        <p className="text-base">You have no orders..</p>
      </div>
    );
  }

  return (
    <table className="min-w-full text-left rtl:text-right mt-6">
      <thead className="text-base text-gray-700 uppercase bg-gray-50 font-primary">
        <tr>
          <th scope="col" className="px-6 py-3">
            #
          </th>
          <th scope="col" className="px-6 py-3">
            ORDER NUMBER
          </th>
          <th scope="col" className="px-6 py-3">
            ORDER NAME
          </th>
          <th scope="col" className="px-6 py-3">
            STATUS
          </th>
          <th scope="col" className="px-6 py-3">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody className="font-secondary">
        {bookingWithPayment.map((booking, index) => {
          return (
            <tr
              key={booking.id}
              className="odd:bg-white even:bg-gray-50 border-b">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{booking.id}</td>
              <td className="px-6 py-4">{booking.property.name}</td>
              <td className="px-6 py-4">
                {booking.payment ? booking.payment.status : "PENDING"}
              </td>
              <td className="px-6 py-4">
                <BookingButton bookingId={booking.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookingList;
