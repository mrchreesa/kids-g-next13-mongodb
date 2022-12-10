import React from "react";
import Registration from "../../../Components/Login/Registration";
import { cookies } from "next/headers";
import Link from "next/link";
import { decode } from "jsonwebtoken";

const SignUp = () => {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");

  const jwtDecoded = decode(authCookie?.value);
  console.log(jwtDecoded);

  return (
    <div>
      {" "}
      <Registration jwtDecoded={jwtDecoded} authCookie={authCookie} />{" "}
    </div>
  );
};

export default SignUp;
