import React, { FormEvent, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FormInput, FormLabel } from "../../../components/Admin/Form";
import { useFormChange } from "../../../components/utils/hook";
import { useCreateAgentMutation } from "../../../store/api/adminApi";
import { selectUser } from "../../../store/slices/userSlice";
import { useSelector } from "react-redux";
import { SERVER_ERROR_MSG } from "../../../components/utils/constants";

interface ErrorResponse {
  status: number;
  data: {
    errors?: inputValidationError[];
    message: string;
    errCode: string;
    success: false;
  };
}

interface inputValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

const AgentAddForm = () => {
  const { token } = useSelector(selectUser);
  const navigateTo = useNavigate();
  const [createAgent] = useCreateAgentMutation();

  const [errMsg, setErrMsg] = useState("");
  const [sucessMsg, setSucessMsg] = useState("");

  const { values, handleChange } = useFormChange({
    name: "",
    email: "",
    photo: "",
  });

  const { name, email, photo } = values;

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrMsg("");
    setSucessMsg("");

    try {
      const result = await createAgent({
        token,
        name,
        email,
        photo,
      });

      if ("error" in result) {
        const errorResponse = result.error as ErrorResponse;
        if (errorResponse.data.errors) {
          setErrMsg(`${errorResponse.data.errors[0].msg}`);
        } else {
          if (errorResponse.data.errCode === "P2003") {
            setErrMsg("Invalid agentId");
          } else {
            setErrMsg(SERVER_ERROR_MSG);
          }
        }
      }
      console.log(result);
      if ("data" in result) {
        setSucessMsg("agent added successfully");
      }
    } catch (error) {
      setErrMsg(SERVER_ERROR_MSG);
    }
  };

  return (
    <main className="bg-brown-200 min-h-screen py-12 px-10">
      <div className="bg-white rounded-lg p-5 pb-20">
        <h1 className="text-xl font-medium uppercase">Add new agent</h1>
        <button
          onClick={() => navigateTo("/admin/agent")}
          className="uppercase text-sm flex gap-2 items-center mt-3">
          <FaArrowLeft />
          Back to agent list
        </button>
        <form
          onSubmit={handleFormSubmit}
          className="mt-7 mx-auto w-[30rem] flex flex-col gap-3">
          <div>
            <FormLabel htmlFor="name" label="name" id="name-label" />
            <FormInput
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <FormLabel htmlFor="email" label="email" id="email-label" />
            <FormInput
              id="email"
              name="email"
              type="text"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <FormLabel htmlFor="photo" label="photo" id="photo-label" />
            <FormInput
              id="photo"
              name="photo"
              type="text"
              autoComplete="off"
              placeholder=""
              value={values.photo}
              onChange={handleChange}
              required
            />
          </div>

          {errMsg && (
            <p className=" text-red-500 p-2 rounded-md text-base font-medium text-center mt-3">
              {errMsg}
            </p>
          )}
          {sucessMsg && (
            <p className=" text-green-500 p-2 rounded-md text-base font-medium text-center mt-3">
              {sucessMsg}
            </p>
          )}
          <button
            className="bg-black text-white p-2 mt-5 rounded-lg flex justify-center w-full"
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default AgentAddForm;
