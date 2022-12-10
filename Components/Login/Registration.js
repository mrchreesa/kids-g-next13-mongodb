"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../Sidebar/SideBar";
import { useRouter } from "next/navigation";

const defaultLoginFieldValues = {
  username: "",
  email: "",
  password: "",
};

const Registration = ({ jwtDecoded, authCookie }) => {
  const [loginFieldValues, setLoginFieldValues] = useState(
    defaultLoginFieldValues
  );

  const [isErrorUsername, setIsErrorUsername] = useState(null);
  const [isErrorEmail, setIsErrorEmail] = useState(null);
  const [isErrorPassword, setIsErrorPassword] = useState(null);

  const [helperTextUsername, setHelperTextUsername] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [helperTextPassword, setHelperTextPassword] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedState = { ...loginFieldValues };
    updatedState[name] = value;
    setLoginFieldValues(updatedState);
  };

  const loginWithCredentials = (e) => {
    e.preventDefault();
    const { email, password } = loginFieldValues;
    switch (true) {
      case !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )?.input:
        setIsErrorEmail(true);
        setHelperTextEmail("Must provide a valid email address");
        break;
      case email.length > 50:
        setIsErrorEmail(true);
        setHelperTextEmail("Email cannot be longer than 50 characters");
        break;
      default:
        setIsErrorEmail(false);
        setHelperTextEmail("");
        break;
    }
    switch (true) {
      case password == null || password.length == 0:
        setIsErrorPassword(true);
        setHelperTextPassword("Must provide a password");
        break;
      case password.length > 0 && password.length <= 5:
        setIsErrorPassword(true);
        setHelperTextPassword("Password must be at least 6 characters long");
        break;
      case password.length > 50:
        setIsErrorPassword(true);
        setHelperTextPassword("Password cannot be longer than 50 characters");
        break;
      default:
        setIsErrorPassword(false);
        setHelperTextPassword("");
        break;
    }
    {
      axios
        .post("/api/signup", loginFieldValues)
        .then((response) => {
          // const { token } = response.data;
          console.log(response);
          if (response.status === 200) {
            router.push("/admin/dashboard");
          }
          setLoginFieldValues(defaultLoginFieldValues);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 ml-64 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {!jwtDecoded ? "Not Authorised" : "Admin Sign Up"}
            </h2>
          </div>
          {!jwtDecoded ? (
            <div></div>
          ) : (
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    value={loginFieldValues.username}
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    value={loginFieldValues.email}
                    name="email"
                    type="email"
                    // autocomplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    value={loginFieldValues.password}
                    name="password"
                    type="password"
                    // autocomplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  onClick={loginWithCredentials}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Registration;
