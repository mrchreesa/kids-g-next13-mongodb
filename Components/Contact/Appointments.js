"use client";
import React from "react";
import { InlineWidget } from "react-calendly";

const AppointmentsPage = () => {
  return (
    <div>
      <InlineWidget url="https://calendly.com/mrchreesa/appointment" />
    </div>
  );
};

export default AppointmentsPage;
