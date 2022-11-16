import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Modal from "react-modal";
import Link from "next/link";

import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";

const ContactForm = () => {
  const [phone, setPhone] = useState("");
  const initialValues = { name: "", school: "", email: "", message: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "25px",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 7) {
      alert("Please enter a valid phone number");
    } else {
      openModal();
      setFormValues(initialValues);
      setPhone("");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  return (
    <div className=" flex flex-col-reverse lg:flex-row justify-center font-merri  items-center ">
      <div
        className="flex  items-center justify-center   lg:w-1/2"
        id="wwa-right"
      >
        <img
          src="/Assets/Images/ContactImage.svg"
          alt=""
          className="lg:h-auto h-auto my-[5vh] ml-[10vw] w-4/6 lg:w-5/6  mb-5"
        />
      </div>
      <div
        className="flex lg:ml-[10vw]  container w-5/6 md:w-4/6 lg:w-1/2  flex-col "
        id="wwa-left"
      >
        <div className=" w-full  lg:w-5/6">
          <form id="contact-form" onSubmit={handleSubmit} method="POST">
            <h2 className="text-[5vh] text-merri leading-[7.5vh] ">
              Arrange your free <br /> initial consultation now
            </h2>
            <div className="flex">
              <div className="form-group basis-[48%]">
                <label for="name">Contact Person</label>
                <input
                  type="text"
                  className="text-base bg-white py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-none"
                  id="name1"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="First and Last Name"
                  required
                />
              </div>
              <div className="basis-[4%]"></div>
              <div className="form-group basis-[48%]">
                <label for="name">School</label>
                <input
                  type="text"
                  className="text-base bg-white py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-none"
                  id="school1"
                  name="school"
                  value={formValues.school}
                  onChange={handleChange}
                  placeholder="School/Organization Name"
                  required
                />
              </div>
            </div>
            <div className="flex">
              <div className="form-group basis-[48%]">
                <label for="phone">Phone</label>
                <div className="flex basis-[48%]">
                  <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    inputProps={{
                      phone: phone,
                      required: true,
                    }}
                  />
                </div>
              </div>
              <div className="basis-[4%]"></div>
              <div className="form-group basis-[48%]">
                <label for="email1">Email</label>
                <input
                  type="email"
                  className="text-base bg-white py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-none"
                  id="email1"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                  placeholder="name@domain.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label for="message">Your message</label>
              <textarea
                className="text-base bg-white py-3.5 px-4 w-full h-full border border-blue outline-0 transition-none"
                rows="3"
                id="message1"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue text-white font-medium text-merri py-[1.2vh] px-[7vh] z-2 text-[2.1vh]  "
            >
              Submit
            </button>
          </form>
          <Modal
            style={customStyles}
            isOpen={isOpenModal}
            onRequestClose={closeModal}
          >
            <h2 className="text-mont text-center text-[10vh] font-normal mt-[3vh]">
              THANK YOU!
            </h2>
            <p className=" text-center items-center mt-[1vh]">
              Your form has been successfully submitted.
            </p>
            <p className=" text-center items-center">
              We will get in touch with you shortly.
            </p>
            <h6 className=" text-center mt-5 items-center text-[3vh] font-normal mb-[0.2vh]">
              Follow us on
            </h6>
            <div className="flex justify-center">
              <a
                className="z-1 text-[3.5vh] content-center color-blue m-1 decoration-0"
                href="https://www.instagram.com/kidsgalaxy.co.in/"
                target="_blank"
                rel="noreferrer"
              >
                <GrInstagram />
              </a>
              <a
                className="z-1 text-[3.5vh] content-center color-blue m-1 decoration-0"
                href="https://www.facebook.com/kidsgalaxy.co.in/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookSquare />
              </a>
              <a
                className="z-1 text-[3.5vh] content-center color-blue m-1 decoration-0"
                href="https://www.linkedin.com/company/kids-galaxy/about/"
                target="_blank"
                rel="noreferrer"
              >
                <ImLinkedin />
              </a>
            </div>
            <p>
              <Link
                href="/about"
                className="text-[2.8vh] font-medium justify-center items-center flex mt-[2vh] mb-[3vh]"
              >
                Click here to know more about us.
              </Link>
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
