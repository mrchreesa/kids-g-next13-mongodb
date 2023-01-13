"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const defaultLoginFieldValues = {
  username: "",
  email: "",
  password: "",
};

const Registration = ({ jwtDecoded }) => {
  const [loginFieldValues, setLoginFieldValues] = useState(
    defaultLoginFieldValues
  );
  const [isErrorUsername, setIsErrorUsername] = useState(null);
  const [isErrorEmail, setIsErrorEmail] = useState(null);
  const [isErrorPassword, setIsErrorPassword] = useState(null);

  const [helperTextUsername, setHelperTextUsername] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [helperTextPassword, setHelperTextPassword] = useState("");

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const url = "/api/availabilityList";
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  let newAdminList = [];
  data?.forEach((item) =>
    newAdminList.push({
      username: item.username,
      superAdmin: item.superAdmin,
    })
  );
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
        .post(`/api/signup`, loginFieldValues)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            router.push("/admin");
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
                </button>{" "}
              </div>{" "}
            </form>
          )}
        </div>{" "}
      </div>{" "}
      <div className="flex min-h-full items-center justify-center py-12 ml-64 px-4 sm:px-6 lg:px-8">
        {data ? (
          newAdminList.map((admin, i) => (
            <div className=" px-4 py-2 border m-1 rounded-xl " key={i}>
              <p>Username: {admin.username}</p>
              <p>Super Admin :{admin.superAdmin ? " Yes" : " No"}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center align-center" role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Registration;
