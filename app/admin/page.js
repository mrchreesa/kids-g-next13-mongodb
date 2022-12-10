import React from "react";
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";

const Admin = async () => {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");
  let jwtDecoded;
  let username;
  if (authCookie) {
    const { value } = authCookie;
    jwtDecoded = decode(value);
    username = jwtDecoded.username;
  }
  return (
    <div className="ml-64 ">
      <div className="w-full flex flex-col items-center mt-20">
        <h1 className="pt-4 text-2v">Welcome to Admin Panel</h1>
        {username ? <h1 className="pt-5 text-3v">{username}</h1> : null}
      </div>
    </div>
  );
};
export default Admin;
