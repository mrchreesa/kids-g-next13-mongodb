import React from "react";
import AppointmentsPage from "../../Components/Contact/AppointmentsPage";
import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
// import { getData } from "../../pages/api/availabilityList";

// const getAvailableSlots = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/availabilityList`
//   );
//   if (!res.ok) {
//     console.log(res);
//     // throw new Error("Failed to fetch data ");
//   }

//   return res.json();
// };
// const getAvailableSlots = async () => {
//   const res = await getData();
//   // console.log(res);
//   return res;
// };
// const getAvailableSlots = async () => {
//   await connectDB();
//   console.log("Mongo");
//   try {
//     const availiblityList = await Users.find();
//     // console.log(availiblityList);
//     return availiblityList;
//   } catch (err) {
//     console.log(err);
//   }
// };

const Appointments = async () => {
  // const data = await getAvailableSlots();
  // console.log(data);
  return (
    <div className="App">
      <div className="section section0 fp-auto-height-responsive items-center">
        <AppointmentsPage /*data={data}*/ />
      </div>
    </div>
  );
};

export default Appointments;
