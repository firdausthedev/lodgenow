import React from "react";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";
import { Agent } from "../../../store/types";
import { FaPenToSquare } from "react-icons/fa6";
import { useGetAllAgentQuery } from "../../../store/api/agentApi";
import { useNavigate } from "react-router-dom";

const AgentPageAdmin = () => {
  const navigateTo = useNavigate();
  const { data, isLoading, isError } = useGetAllAgentQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

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

  const ItemList = ({ items }: { items: Agent[] }) => {
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

  return (
    <main className="bg-brown-200 min-h-screen py-12 px-10">
      <div className="bg-white rounded-lg p-5">
        <h1 className="text-xl font-medium uppercase">Agent List</h1>
        <button
          onClick={() => {
            navigateTo("./add");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          Add
        </button>
        <table className="min-w-full text-left rtl:text-right mt-6">
          <thead className="text-base text-gray-700 uppercase bg-gray-50 font-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                PICTURE
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="font-secondary">
            <ItemList items={data.data} />
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AgentPageAdmin;
