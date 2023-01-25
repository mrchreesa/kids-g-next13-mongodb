import React from "react";
import AppointmentsAdmin from "../../../Components/Appointments/AppointmentsAdmin";
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";

const Contacts = async () => {
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
    <div>
      <AppointmentsAdmin username={username} />
    </div>
  );
};

export default Contacts;
