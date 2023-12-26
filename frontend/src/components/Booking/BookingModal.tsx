import React from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { useGetOneBookingQuery } from "../../store/api/bookingApi";

import Spinner from "../layout/Spinner";
import { useNavigate } from "react-router-dom";

interface BookingOrderModalProps {
  bookingId: string;
  setIsModal: (isModal: boolean) => void;
}

const BookingModal = ({ setIsModal, bookingId }: BookingOrderModalProps) => {
  const { token } = useSelector(selectUser);
  const navigateTo = useNavigate();

  const {
    data: booking,
    isLoading,
    isError,
  } = useGetOneBookingQuery([token, bookingId]);

  if (isLoading) {
    return createPortal(
      <div
        aria-label="modal"
        className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
        <div
          aria-label="modal-content"
          className="bg-brown-200 flex flex-col rounded-xl w-[25rem] h-3/4 p-4 gap-3">
          <button
            aria-label="close-modal"
            className="flex w-fit hover:bg-white/70 rounded-full p-3 transition-colors ease-in-out duration-200"
            onClick={() => setIsModal(false)}>
            <FaXmark aria-hidden="true" className="text-black text-base" />
          </button>
          <div className="mx-auto">
            <Spinner />
          </div>
        </div>
      </div>,
      document.getElementById("modal") as HTMLElement,
    );
  }

  if (isLoading) {
    return createPortal(
      <div
        aria-label="modal"
        className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
        <div
          aria-label="modal-content"
          className="bg-brown-200 flex flex-col rounded-xl w-[25rem] h-3/4 p-4 gap-3">
          <button
            aria-label="close-modal"
            className="flex w-fit hover:bg-white/70 rounded-full p-3 transition-colors ease-in-out duration-200"
            onClick={() => setIsModal(false)}>
            <FaXmark aria-hidden="true" className="text-black text-base" />
          </button>
          <div className="mx-auto">
            <Spinner />
          </div>
        </div>
      </div>,
      document.getElementById("modal") as HTMLElement,
    );
  }
  if (isError || !booking) {
    return createPortal(
      <div
        aria-label="modal"
        className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
        <div
          aria-label="modal-content"
          className="bg-brown-200 flex flex-col rounded-xl w-[25rem] h-3/4 p-4 gap-3">
          <button
            aria-label="close-modal"
            className="flex w-fit hover:bg-white/70 rounded-full p-3 transition-colors ease-in-out duration-200"
            onClick={() => setIsModal(false)}>
            <FaXmark aria-hidden="true" className="text-black text-base" />
          </button>
          <p className="font-secondary text-base">
            Error fetching order. Please try again.
          </p>
        </div>
      </div>,
      document.getElementById("modal") as HTMLElement,
    );
  }

  const BookingTitle = ({ text }: { text: string }) => {
    return (
      <p className="font-secondary text-lg font-medium text-gray-600 uppercase">
        {text}
      </p>
    );
  };

  const BookingDesc = ({ text }: { text: string }) => {
    return <p className="font-secondary text-sm ">{text}</p>;
  };

  const convertDateToString = (date: Date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const dateString = `${year}/${month}/${day}`;
    return dateString;
  };

  const checkIn = convertDateToString(booking.data.checkIn);
  const checkOut = convertDateToString(booking.data.checkOut);

  return createPortal(
    <div
      aria-label="modal"
      className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
      <div
        aria-label="modal-content"
        className="bg-brown-200 flex flex-col rounded-xl w-[25rem] h-3/4 p-4 gap-3 overflow-auto">
        <button
          aria-label="close-modal"
          className="flex w-fit hover:bg-white/70 rounded-full p-3 transition-colors ease-in-out duration-200"
          onClick={() => setIsModal(false)}>
          <FaXmark aria-hidden="true" className="text-black text-base" />
        </button>
        <h2 className="font-primary text-3xl font-semibold text-center">
          Order Details
        </h2>
        <div className="flex flex-col gap-2">
          <div>
            <BookingTitle text="Order Number" />
            <BookingDesc text={bookingId} />
          </div>
          <div>
            <BookingTitle text="Product in order" />
            <div
              tabIndex={0}
              onKeyUp={e => {
                if (e.key === "Enter") {
                  navigateTo(`/property/${booking.data.property.id}`);
                }
              }}
              role="button"
              className="flex gap-3"
              onClick={() => {
                navigateTo(`/property/${booking.data.property.id}`);
              }}>
              <img
                src={booking.data.property.photos[0]}
                alt="product"
                className="w-1/2 rounded object-cover"
              />
              <div className="flex flex-col ">
                <p className="font-primary font-medium text-lg">
                  {booking.data.property.name}
                </p>
                <p className="font-secondary text-sm">From: {checkIn}</p>
                <p className="font-secondary text-sm">Until: {checkOut}</p>
                <p className="font-secondary font-medium mt-2">
                  {booking.data.payment && `$${booking.data.payment.amount}`}
                </p>
              </div>
            </div>
          </div>
          <div>
            <BookingTitle text="Order Status" />
            <BookingDesc
              text={
                booking.data.payment
                  ? booking.data.payment.status.toString()
                  : "Pending"
              }
            />
          </div>
          <div className="mt-8">
            <button className="uppercase font-secondary text-red-600 underline w-fit">
              Cancel the order
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement,
  );
};

export default BookingModal;
