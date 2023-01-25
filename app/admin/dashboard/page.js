import React from "react";
import DashboardPage from "../../../Components/DashboardPage/DashboardPage";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");

  return <DashboardPage authCookie={authCookie} />;
};

export default Dashboard;
