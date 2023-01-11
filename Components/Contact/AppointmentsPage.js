"use client";
import React from "react";
import AppointmentsCalender from "../Contact/AppointmentsCalender";

const AppointmentsPage = ({ data }) => {
  console.log(typeof data);
  return (
    <div>
      <AppointmentsCalender data={data} />
    </div>
  );
};

export default AppointmentsPage;
