"use client";
import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from "next/head";
import Navbar from "../../Components/NavBar";
import AppointmentsPage from "../../Components/Contact/Appointments";

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
  /*
   * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
   */
};

const Appointments = () => {
  const onLeave = (origin, destination, direction) => {
    console.log("onLeave", { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  };

  return (
    <div className="App">
      <Head>
        <title>Kids Galaxy</title>
        {/* <link href="/static/styles.css" rel="stylesheet" /> */}
      </Head>
      <Navbar />

      <div className="section section0 fp-auto-height-responsive items-center">
        <AppointmentsPage />
      </div>
    </div>
  );
};

export default Appointments;
