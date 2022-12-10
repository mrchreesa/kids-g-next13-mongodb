"use client";
import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from "next/head";
import Navbar from "../../Components/NavBar";
import ContactForm from "../../Components/Contact/ContactForm";

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
  /*
   * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
   */
};

const Contacts = () => {
  const onLeave = (origin, destination, direction) => {
    console.log("onLeave", { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  };

  return (
    <div className="App">
      <ContactForm />
    </div>
  );
};

export default Contacts;
