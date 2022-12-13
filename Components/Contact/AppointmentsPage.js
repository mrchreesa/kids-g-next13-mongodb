"use client";
import React from "react";
import { InlineWidget } from "react-calendly";
import AppointmentsCalender from "../Contact/AppointmentsCalender";

const AppointmentsPage = ({ data }) => {
  // console.log(data);
  return (
    <div>
      {/* <InlineWidget url="https://calendly.com/mrchreesa/appointment" /> */}
      <AppointmentsCalender data={data} />
    </div>
  );
};

export default AppointmentsPage;
