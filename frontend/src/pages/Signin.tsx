import React, { FormEvent, useState, useEffect } from "react";
import { useFormChange } from "./../components/utils/hook";
import {
  postUserSignInResponse,
  usePostUserSignInQuery,
} from "../store/api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../store/slices/userSlice";

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

  const { values, handleChange, resetValues } = useFormChange({
    username: "",
    password: "",
  });

  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const username = values.username;
  const password = values.password;

  const { data, error, isLoading, isError, isSuccess } = usePostUserSignInQuery(
    {
      username,
      password,
    },
    { skip: isFormSubmit === false },
  );

  const [errorMsg, setErrorMsg] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmit(true);
  };

  useEffect(() => {
    const handleSuccessLogin = (data: postUserSignInResponse) => {
      resetValues();
      setErrorMsg("");
      setIsFormSubmit(false);
      dispatch(setUserToken(data.token));
      navigateTo("/");
    };

    if (isError) {
      setErrorMsg((error as ErrorResponse).data.message);
      setIsFormSubmit(false);
    }

    if (isSuccess) {
      handleSuccessLogin(data);
    }
  }, [
    isError,
    error,
    isLoading,
    isSuccess,
    resetValues,
    data,
    navigateTo,
    dispatch,
  ]);

  return (
    <main className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="w-[400px] mx-auto bg-white rounded-lg p-4 flex flex-col">
        <a
          className="text-center font-bold text-xl font-primary inline-block w-full"
          href="/">
          lodgenow
        </a>
        <h1 className="text-lg font-primary font-bold">Signin</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3 mt-3">
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
                className="appearance-none border border-gray-300 rounded-md w-full p-3 text-gray-600 leading-tight focus:outline-purplish-blue font-medium font-sans"
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
                <p className="helper-password text-red-500 inline text-base font-medium"></p>
              </div>
              <input
                className="appearance-none border border-gray-300 rounded-md w-full p-3 text-gray-600 leading-tight focus:outline-purplish-blue font-medium font-sans"
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

          <p className=" text-red-500  text-base font-medium font-secondary text-center mt-3">
            {errorMsg}
          </p>
          <button
            className="bg-black text-white p-2 mt-5 rounded-lg flex justify-center font-secondary w-full"
            disabled={isLoading}
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signin;
