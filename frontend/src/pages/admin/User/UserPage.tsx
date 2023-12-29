import React from "react";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import {
  useGetAllUserAdminQuery,
  getAllUserData,
} from "../../../store/api/adminApi";
import { selectUser } from "../../../store/slices/userSlice";
import { useSelector } from "react-redux";

const UserPageAdmin = () => {
  const { token } = useSelector(selectUser);
  const { data, isLoading, isError } = useGetAllUserAdminQuery(token);

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

  const ItemList = ({ items }: { items: getAllUserData[] }) => {
    return items.map((item, index) => {
      return (
        <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4">{item.username}</td>
        </tr>
      );
    });
  };

  return (
    <main className="bg-brown-200 min-h-screen py-12 px-10">
      <div className="bg-white rounded-lg p-5">
        <h1 className="text-xl font-medium uppercase">Payment List</h1>
        <table className="min-w-full text-left rtl:text-right mt-6">
          <thead className="text-base text-gray-700 uppercase bg-gray-50 font-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
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

export default UserPageAdmin;
