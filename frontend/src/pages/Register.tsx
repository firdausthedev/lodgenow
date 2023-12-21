import React, { FormEvent, useState, useEffect } from "react";
import { useFormChange } from "./../components/utils/hook";
import {
  postUserResponse,
  usePostUserRegisterQuery,
} from "../store/api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../store/slices/userSlice";

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

const Register = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange, resetValues } = useFormChange({
    username: "",
    password: "",
  });

  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const { data, error, isLoading, isError, isSuccess } =
    usePostUserRegisterQuery(
      {
        username: values.username,
        password: values.password,
      },
      { skip: isFormSubmit === false },
    );

  const [errorMsg, setErrorMsg] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmit(true);
  };

  useEffect(() => {
    const handleRegister = (data: postUserResponse) => {
      resetValues();
      setErrorMsg("");
      setIsFormSubmit(false);
      dispatch(setUserToken(data.token));
      navigateTo("/");
    };

    if (isError) {
      const errorResponse = error as ErrorResponse;
      if (errorResponse.data.errors) {
        setErrorMsg(errorResponse.data.errors[0].msg);
      } else {
        if (errorResponse.data.errCode === "P2002") {
          setErrorMsg("username already taken");
        } else {
          setErrorMsg("Something went wrong");
        }
      }
      setIsFormSubmit(false);
    }

    if (isSuccess) {
      if (data.success) {
        handleRegister(data);
      }
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
          className="text-center font-bold text-3xl font-primary inline-block w-full"
          href="/">
          lodgenow
        </a>
        <h1 className="text-lg font-primary font-bold">Create an account</h1>
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
              <p className="helper-password text-gray-500 font-normal font-secondary text-xs mt-1">
                6+ characters with at least one uppercase, one lowercase, one
                number, and one special character.
              </p>
            </div>
          </div>

          <p className=" text-red-500  text-base font-medium font-secondary text-center mt-3">
            {errorMsg}
          </p>
          <button
            className="bg-black text-white p-2 mt-5 rounded-lg flex justify-center font-secondary w-full"
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
