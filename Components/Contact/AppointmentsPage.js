"use client";
import React, { useState, useEffect } from "react";
import AppointmentsCalender from "../Contact/AppointmentsCalender";
import axios from "axios";
import useSWR from "swr";

const AppointmentsPage = () => {
  // const [data, setData] = useState(null);
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const url = "/api/availabilityList";
  const { data, error, isLoading } = useSWR(url, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // return <div>hello {data.name}!</div>;

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/availabilityList`)
  //     .then((response) => {
  //       setData(response.data);
  //     });
  // }, []);
  // console.log(data);
  return (
    <div>
      <AppointmentsCalender data={data} />
    </div>
  );
};

export default AppointmentsPage;
