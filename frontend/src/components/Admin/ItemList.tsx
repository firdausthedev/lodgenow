import React from "react";
import { useNavigate } from "react-router-dom";
import { Agent, Property } from "./../../store/types";
import { FaEye, FaPenToSquare } from "react-icons/fa6";
import {
  getAllBookingAdminData,
  getAllPaymentAdmin,
  getAllUserData,
} from "../../store/api/adminApi";
import { convertDateToString } from "../utils/booking";
import { getAllReviewsData } from "../../store/api/reviewApi";

export const ItemListAgent = ({ items }: { items: Agent[] }) => {
  const navigateTo = useNavigate();
  const handleEdit = (agentId: string) => {
    navigateTo(`./edit/${agentId}`);
  };
  return items.map((item, index) => {
    return (
      <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">
          <div
            id="agent-photo"
            className="h-20 w-20 shadow-md rounded-sm bg-top bg-cover bg-no-repeat
                    transition-transform transform group-hover:scale-110"
            style={{ backgroundImage: `url('${item.photo}')` }}
          />
        </td>
        <td className="px-6 py-4">{item.name}</td>
        <td className="px-6 py-4">{item.id}</td>
        <td className="px-6 py-4">{item.email}</td>
        <td className="px-6 py-4 flex gap-3">
          <button
            onClick={() => handleEdit(item.id)}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
            <FaPenToSquare />
          </button>
        </td>
      </tr>
    );
  });
};

export const ItemListBooking = ({
  items,
}: {
  items: getAllBookingAdminData[];
}) => {
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

export const ItemListPayment = ({ items }: { items: getAllPaymentAdmin[] }) => {
  return items.map((item, index) => {
    return (
      <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{item.booking.property.name}</td>
        <td className="px-6 py-4">{item.booking.user.username}</td>
        <td className="px-6 py-4">{item.amount}</td>
        <td className="px-6 py-4">{item.status}</td>
      </tr>
    );
  });
};

export const ItemListProperty = ({ items }: { items: Property[] }) => {
  const navigateTo = useNavigate();
  const handleView = (propertyId: string) => {
    navigateTo(`/property/${propertyId}`);
  };
  const handleEdit = (propertyId: string) => {
    navigateTo(`./edit/${propertyId}`);
  };
  return items.map((item, index) => {
    return (
      <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">
          <div
            id="agent-photo"
            className="h-16 w-24 shadow-md rounded-sm bg-center bg-cover bg-no-repeat
                    transition-transform transform group-hover:scale-110"
            style={{ backgroundImage: `url('${item.photos[0]}')` }}
          />
        </td>
        <td className="px-6 py-4">{item.name}</td>
        <td className="px-6 py-4">${item.price}</td>
        <td className="px-6 py-4">{item.type}</td>
        <td className="px-6 py-4 flex gap-3">
          <button
            onClick={() => handleView(item.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            <FaEye />
          </button>
          <button
            onClick={() => handleEdit(item.id)}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
            <FaPenToSquare />
          </button>
        </td>
      </tr>
    );
  });
};

export const ItemListReview = ({ items }: { items: getAllReviewsData[] }) => {
  const navigateTo = useNavigate();
  const handleView = (propertyId: string) => {
    navigateTo(`/property/${propertyId}`);
  };
  return items.map((item, index) => {
    return (
      <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{item.user.username}</td>
        <td className="px-6 py-4">{item.comment}</td>
        <td className="px-6 py-4">{item.rating}</td>
        <td className="px-6 py-4">{item.property.name}</td>
        <td className="px-6 py-4 flex gap-3">
          <button
            onClick={() => handleView(item.propertyId)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            <FaEye />
          </button>
        </td>
      </tr>
    );
  });
};

export const ItemListUser = ({ items }: { items: getAllUserData[] }) => {
  return items.map((item, index) => {
    return (
      <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{item.username}</td>
      </tr>
    );
  });
};

export const TableHeader = ({ headers }: { headers: string[] }) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <th key={index} scope="col" className="px-6 py-3">
          {header}
        </th>
      ))}
    </tr>
  );
};
