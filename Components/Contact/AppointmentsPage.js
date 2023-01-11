"use client";
import React, { useState, useEffect } from "react";
import AppointmentsCalender from "../Contact/AppointmentsCalender";
import axios from "axios";

const AppointmentsPage = () => {
  const [data, setData] = useState(null);
  // ${process.env.NEXT_PUBLIC_API_URL}/
  useEffect(() => {
    axios.get(`api/availabilityList`).then((response) => {
      setData(response.data);
    });
  }, []);
  // console.log(data);
  return (
    <div>
      <AppointmentsCalender data={data} />
    </div>
  );
};

export default AppointmentsPage;
