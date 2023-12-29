import React, { FormEvent, useState } from "react";
import { useFormChange } from "../../components/utils/hook";
import { useSignInAdminMutation } from "../../store/api/adminApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { SERVER_ERROR_MSG } from "../../components/utils/constants";

interface ErrorResponse {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}

const Signin = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange } = useFormChange({
    username: "",
    password: "",
  });

  const [signin] = useSignInAdminMutation();

  const [errMsg, setErrMsg] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const username = values.username;
      const password = values.password;
      const result = await signin({ username, password });

      if ("error" in result) {
        const errorResponse = result.error as ErrorResponse;
        setErrMsg(errorResponse.data.message);
      }

      if ("data" in result) {
        dispatch(setUser({ token: result.data.token, role: "admin" }));
        navigateTo("./dashboard");
      }
    } catch (error) {
      setErrMsg(SERVER_ERROR_MSG);
    }
  };

  return (
    <main className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="w-[400px] mx-auto bg-white rounded-lg p-4 flex flex-col">
        <Link
          className="text-center font-bold text-3xl font-primary inline-block w-full text-accent"
          to="/">
          lodgenow
        </Link>
        <h1 className="text-lg font-primary font-bold mt-7">Signin</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3 mt-1">
            <div>
              <div className="flex justify-between">
                <label
                  className="block text-marine-blue text-base font-medium mb-1"
                  htmlFor="username"
                  id="username-label">
                  Username
                </label>
              </div>
              <input
                className="appearance-none border border-gray-300 rounded-md w-full p-3 text-gray-600 leading-tight focus:outline-purplish-blue font-medium font-secondary"
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                placeholder="Please enter your username here"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  className="text-marine-blue text-base font-medium mb-1"
                  htmlFor="password"
                  id="password-label">
                  Password
                </label>
              </div>
              <input
                className="appearance-none border border-gray-300 rounded-md w-full p-3 text-gray-600 leading-tight focus:outline-purplish-blue font-medium font-secondary"
                id="password"
                type="password"
                name="password"
                autoComplete="on"
                placeholder="Please enter your password here"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <p className=" text-red-500  text-base font-medium text-center mt-3">
            {errMsg}
          </p>
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

export default Signin;
