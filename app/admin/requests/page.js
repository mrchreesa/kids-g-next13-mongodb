import React from "react";
import RequestAppointmentsAdmin from "../../../Components/Appointments/RequestAppointmentsAdmin";
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";
const Requests = () => {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");
  let jwtDecoded;
  let username;
  if (authCookie) {
    const { value } = authCookie;
    jwtDecoded = decode(value);
    username = jwtDecoded.username;
  }
  return <RequestAppointmentsAdmin username={username} />;
};

export default Requests;
