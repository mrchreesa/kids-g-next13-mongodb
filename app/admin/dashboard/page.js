import React from "react";
import DashboardPage from "../../../Components/DashboardPage/DashboardPage";
import { cookies } from "next/headers";
import Link from "next/link";
import { decode } from "jsonwebtoken";

async function getContactFormEntries() {
  const res = await fetch("http://localhost:3000/api/admin");
  if (!res.ok) {
    // This will activate the cloest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Dashboard = async () => {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");

  const data = await getContactFormEntries();

  return <DashboardPage data={data} authCookie={authCookie} />;
};

export default Dashboard;
