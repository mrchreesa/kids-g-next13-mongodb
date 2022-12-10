import React from "react";

const DashboardPage = ({ data }) => {
  return (
    <>
      <div className="flex h-auto flex-wrap ml-64">
        {data?.map((item) => (
          <div key={item._id} className="flex flex-col p-3 m-2 border">
            <h2>{item.name}</h2>
            <h3>{item.school}</h3>
            <p>{item.phone}</p>
            <p>{item.email}</p>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardPage;
