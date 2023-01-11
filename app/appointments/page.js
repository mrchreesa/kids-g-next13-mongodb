import React from "react";
import AppointmentsPage from "../../Components/Contact/AppointmentsPage";
// import { getData } from "../../pages/api/availabilityList";

const getAvailableSlots = async () => {
  const res = await fetch(`${process.env.API_URL}/api/availabilityList`);
  if (!res.ok) {
    console.log(res);
    // throw new Error("Failed to fetch data ");
  }

  return res.json();
};
// const getAvailableSlots = async () => {
//   const res = await getData();
//   // console.log(res);
//   return res;
// };

const Appointments = async () => {
  const data = await getAvailableSlots();
  console.log(data);
  return (
    <div className="App">
      <div className="section section0 fp-auto-height-responsive items-center">
        <AppointmentsPage data={data} />
      </div>
    </div>
  );
};

export default Appointments;
