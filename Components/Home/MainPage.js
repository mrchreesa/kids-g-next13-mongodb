import React from "react";
import Link from "next/link";

const MainPage = () => {
  return (
    <>
      <div className="container flex flex-col-reverse lg:flex-row mb-24 items-center ">
        <div
          className="flex ml-3  lg:w-1/2 md:items-start  md:items-content-center lg:mr-24 mb-20 flex-col text-left"
          id="wwa-left"
        >
          <h3 className="text-5v lg:text-3v font-merri text-blue w-max md:tracking-wide leading-[7vh] mb-[4vh] p-0 ">
            Solution-oriented and efficient <br />
            Education Consultancy Services <br />
            for your school
          </h3>
          <div className="z-2">
            <Link
              className=" bg-blue text-white  hover:bg-gray-500 font-medium z-2 font-mont transition-all p-4 mr-4 tracking-wider"
              href={"/about"}
            >
              Know More
            </Link>
            <Link
              className="bg-transparent text-blue hover:bg-gray-300 hover:border-gray-400 transition-all font-medium z-2 font-mont ml-4 tracking-wider border border-blue p-4"
              href={"/contacts"}
            >
              Get In Touch
            </Link>
          </div>
        </div>
        <div
          className="flex items-center justify-center  lg:w-1/2"
          id="wwa-right"
        >
          <img
            src="/Assets/Images/OBJECTS.svg"
            alt="objests image"
            className="lg:h-auto w-1/2 lg:w-max mb-5"
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
