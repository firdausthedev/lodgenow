import React from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaCartShopping,
  FaHouse,
  FaStar,
  FaUser,
} from "react-icons/fa6";
import { useGetDashboardQuery } from "../../store/api/adminApi";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../components/utils/constants";

const Dashboard = () => {
  const { token } = useSelector(selectUser);
  const { data, isLoading, isError } = useGetDashboardQuery(token);

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

  const DashboardItem = ({ icon, title, length, to }) => {
    return (
      <Link
        to={`../${to}`}
        className="p-5 bg-white rounded-lg text-2xl flex justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {icon}
          {title}
        </div>
        <p>{length}</p>
      </Link>
    );
  };

  return (
    <main className="bg-brown-200 min-h-screen py-12 px-10">
      <div className="flex flex-col gap-5">
        <p className="text-4xl font-light">Hello, {data.admin_username}!</p>
        <DashboardItem
          to="./property"
          icon={<FaHouse />}
          title="Property"
          length={data.properties}
        />
        <DashboardItem
          to="./agent"
          icon={<FaUser />}
          title="Agent"
          length={data.agents}
        />
        <DashboardItem
          to="./booking"
          icon={<FaBook />}
          title="Booking"
          length={data.bookings}
        />
        <DashboardItem
          to="./payment"
          icon={<FaCartShopping />}
          title="Payment"
          length={data.payments}
        />
        <DashboardItem
          to="./review"
          icon={<FaStar />}
          title="Review"
          length={data.reviews}
        />
        <DashboardItem
          to="./user"
          icon={<FaUser />}
          title="User"
          length={data.users}
        />
      </div>
    </main>
  );
};

export default Dashboard;
