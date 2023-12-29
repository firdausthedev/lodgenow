import React from "react";
import { selectUser } from "../../../store/slices/userSlice";
import { useSelector } from "react-redux";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import { useGetAllBookingAdminQuery } from "../../../store/api/adminApi";
import { getAllBookingAdminData } from "../../../store/api/adminApi";
import { convertDateToString } from "../../../components/utils/booking";

const BookingPageAdmin = () => {
  const { token } = useSelector(selectUser);
  const { data, isLoading, isError } = useGetAllBookingAdminQuery(token);

  if (isLoading) {
    return (
      <main className="min-h-screen py-12 px-10 bg-brown-200 flex justify-center items-start">
        <Spinner />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="min-h-screen py-12 px-10 bg-brown-200 flex justify-start items-start">
        <p className="text-2xl font-light">{SERVER_ERROR_MSG}</p>
      </main>
    );
  }

  const ItemList = ({ items }: { items: getAllBookingAdminData[] }) => {
    return items.map((item, index) => {
      const checkIn = convertDateToString(item.checkIn);
      const checkOut = convertDateToString(item.checkOut);
      return (
        <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4">{checkIn}</td>
          <td className="px-6 py-4">{checkOut}</td>
          <td className="px-6 py-4">{item.property.name}</td>
          <td className="px-6 py-4">{item.user.username}</td>
        </tr>
      );
    });
  };

  return (
    <main className="bg-brown-200 min-h-screen py-12 px-10">
      <div className="bg-white rounded-lg p-5">
        <h1 className="text-xl font-medium uppercase">Booking List</h1>

        <table className="min-w-full text-left rtl:text-right mt-6">
          <thead className="text-base text-gray-700 uppercase bg-gray-50 font-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                CHECKIN
              </th>
              <th scope="col" className="px-6 py-3">
                CHECKOUT
              </th>
              <th scope="col" className="px-6 py-3">
                PROPERTY
              </th>
              <th scope="col" className="px-6 py-3">
                USER
              </th>
            </tr>
          </thead>
          <tbody className="font-secondary">
            <ItemList items={data} />
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default BookingPageAdmin;
