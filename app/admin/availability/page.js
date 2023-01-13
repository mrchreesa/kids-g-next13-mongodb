import React from "react";
import AvailabilityAdmin from "../../../Components/Appointments/AvailabilityAdmin";
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";

// async function getAdminList() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/availabilityList`
//   );
//   if (!res.ok) {
//     console.log(res);
//     // throw new Error("Failed to fetch data ");
//   }

//   return res.json();
// }
const Availability = async () => {
  // const cookiesList = cookies();
  // const authCookie = cookiesList.get("auth");

  // let jwtDecoded;
  // let adminList;
  // if (authCookie) {
  //   const { value } = authCookie;
  //   jwtDecoded = decode(value);
  //   adminList = await getAdminList();
  // }
  return (
    <div>
      {" "}
      <AvailabilityAdmin /*jwtDecoded={jwtDecoded} adminList={adminList}*/ />;
    </div>
  );
};

export default Availability;
