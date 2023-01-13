import React from "react";
import DashboardPage from "../../../Components/DashboardPage/DashboardPage";
import { cookies } from "next/headers";

// async function getContactFormEntries() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/admin`);
//   if (!res.ok) {
//     // This will activate the cloest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const Dashboard = async () => {
  const cookiesList = cookies();
  const authCookie = cookiesList.get("auth");

  // const data = await getContactFormEntries();

  return <DashboardPage authCookie={authCookie} />;
};

export default Dashboard;
