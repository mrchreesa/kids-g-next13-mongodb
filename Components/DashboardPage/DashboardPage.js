import React from "react";
import useSWR from "swr";

const DashboardPage = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const url = "/api/admin";
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
