import React from "react";
import Registration from "../../../Components/Login/Registration";
import { cookies } from "next/headers";
import Link from "next/link";
import { decode } from "jsonwebtoken";

const getUsersList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/availabilityList`
  );
  if (!res.ok) {
    console.log(res);
    // throw new Error("Failed to fetch data ");
  }

  return res.json();
};
const SignUp = async () => {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");

  const jwtDecoded = decode(authCookie?.value);
  const usersList = await getUsersList();

  return (
    <div>
      {" "}
      <Registration
        jwtDecoded={jwtDecoded}
        authCookie={authCookie}
        usersList={usersList}
      />{" "}
    </div>
  );
};

export default SignUp;
