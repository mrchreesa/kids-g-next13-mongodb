import React from "react";
import AppointmentsPage from "../../Components/Contact/AppointmentsPage";

const getAvailableSlots = async () => {
  const res = await fetch("/api/availabilityList");
  if (!res.ok) {
    console.log(res);
    // throw new Error("Failed to fetch data ");
  }

  return res.json();
};

const Appointments = async () => {
  const data = await getAvailableSlots();
  return (
    <div className="App">
      <div className="section section0 fp-auto-height-responsive items-center">
        <AppointmentsPage data={data} />
      </div>
    </div>
  );
};

export default Appointments;
