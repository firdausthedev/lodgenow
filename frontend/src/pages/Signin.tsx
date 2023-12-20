import React, { FormEvent, useState } from "react";
import { useFormChange } from "./../components/utils/hook";
import { usePostUserSignInMutation } from "../store/api/userApi";
const Signin = () => {
  const { values, handleChange, resetValues } = useFormChange({
    username: "",
    password: "",
  });
  const [signIn] = usePostUserSignInMutation();

  const [errorMsg, setErrorMsg] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const username = values.username;
      const password = values.password;

      const payload = await signIn({ username, password }).unwrap();
      console.log(payload.token);
    } catch (err) {
      setErrorMsg(err.data.message);
    }
  };

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
                <p className="helper-username text-red-500 inline text-base font-medium">
                  {errorMsg}
                </p>
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
                placeholder="Please enter your password here"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>
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

export default Signin;
