"use client";
import React from "react";
import AppointmentsCalender from "../Contact/AppointmentsCalender";
import useSWR from "swr";

const AppointmentsPage = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const url = "/api/availabilityList";
  const { data, error, isLoading } = useSWR(url, fetcher);
  // console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <AppointmentsCalender data={data} />
    </div>
  );
};

export default AppointmentsPage;
