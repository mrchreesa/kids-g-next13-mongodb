"use client";
import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import ServicesComponent from "../../Components/Services/ServicesComponent";

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
  /*
   * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
   */
};

const Services = () => {
  const onLeave = (origin, destination, direction) => {
    console.log("onLeave", { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  };

  return (
    <div className="App">
      <ReactFullpage
        navigation
        pluginWrapper={pluginWrapper}
        onLeave={onLeave}
        // scrollHorizontally={true}
        verticalCentered={true}
        sectionsColor={[
          "#F3F3F3",
          "#F3F3F3",
          "#F3F3F3",
          "#F3F3F3",
          "#F3F3F3",
          "#F3F3F3",
        ]}
        render={
          () => {
            return (
              <>
                <ReactFullpage.Wrapper>
                  <div className="section section0 fp-auto-height-responsive items-center">
                    <ServicesComponent />
                  </div>
                  <div className="section section1 fp-auto-height-responsive items-center">
                    <ServicesComponent />
                  </div>
                  <div className="section section2 fp-auto-height-responsive items-center">
                    <ServicesComponent />
                  </div>
                  <div className="section section3 fp-auto-height-responsive items-center">
                    <ServicesComponent />
                  </div>
                </ReactFullpage.Wrapper>
              </>
            );
          }
          // console.log("render prop change") || (

          // )
        }
      />
    </div>
  );
};

export default Services;
