import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Modal from "react-modal";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";

const ContactForm = () => {
  const initialValues = { name: "", school: "", email: "", message: "" };

  const [phone, setPhone] = useState("");
  const [formValues, setFormValues] = useState(initialValues);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formName, setFormName] = useState("");
  const [formSchool, setFormSchool] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const [errorMessageName, setErrorMessageName] = useState("Error");
  const [errorMessageSchool, setErrorMessageSchool] = useState("Error");
  const [errorMessagePhone, setErrorMessagePhone] = useState("Error");
  const [errorMessageEmail, setErrorMessageEmail] = useState("Error");
  const [errorMessageMessage, setErrorMessageMessage] = useState("Error");

  const [errorName, setErrorName] = useState(false);
  const [errorSchool, setErrorSchool] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidName = (name) => {
    const re = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    return re.test(String(name));
  };

  const validateInputs = () => {
    const nameValue = formValues.name.trim();
    const emailValue = formValues.email.trim();

    if (formValues.name === "") {
      setErrorMessageName("Name is required");
      setErrorName(true);
    } else if (!isValidName(nameValue)) {
      setErrorMessageName("Name should be 3-26 characters");
      setErrorName(true);
    } else {
      setErrorName(false);
      setFormName(formValues.name);
    }
    if (formValues.school === "") {
      setErrorMessageSchool("School is required");
      setErrorSchool(true);
    } else {
      setFormSchool(formValues.school);
      setErrorSchool(false);
    }
    if (phone === "") {
      setErrorMessagePhone("Phone number is required");
      setErrorPhone(true);
    } else if (phone.length < 10) {
      setErrorMessagePhone("Please provide a valid phone number");
      setErrorPhone(true);
    } else {
      setErrorPhone(false);
      setFormPhone(phone);
    }
    if (formValues.email === "") {
      setErrorMessageEmail("Email is required");
      setErrorEmail(true);
    } else if (!isValidEmail(emailValue)) {
      setErrorMessageEmail("Provide a valid email address");
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
      setFormEmail(formValues.email);
    }
    if (formValues.message === "") {
      setErrorMessageMessage("Message is required");
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      setFormMessage(formValues.message);
    }
  };
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
    validateInputs();
    if (
      errorName !== true &&
      errorSchool !== true &&
      errorPhone !== true &&
      errorEmail !== true &&
      errorMessage !== true
    ) {
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/api/contact`, {
          name: formValues.name,
          school: formValues.school,
          phone: phone,
          email: formValues.email,
          message: formValues.message,
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
          if (response.status === 201) {
            console.log("Message Sent.");
            openModal();
            setFormValues(initialValues);
            setPhone("");
            setFormEmail("");
          } else if (response.status === 202) {
            alert(
              "You have already submitted a message with us and we will get back to you soon!"
            );
            setFormValues(initialValues);
            setPhone("");
            setFormEmail("");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // console.log(formValues);

  return (
    <div className=" flex flex-col-reverse lg:flex-row justify-center font-merri  items-center ">
      <div
        className="flex  items-center justify-center   lg:w-1/2"
        id="wwa-right"
      >
        <Image
          src="/Assets/Images/ContactImage.svg"
          alt=""
          width={300}
          height={300}
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
              <div className="flex flex-col basis-[48%]">
                <div className="form-group basis-[48%]">
                  <label htmlFor="name">Contact Person</label>
                  <input
                    type="text"
                    className={
                      errorName
                        ? "text-base bg-white py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all"
                        : "text-base bg-white py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-all"
                    }
                    id="name1"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="First and Last Name"
                    // required
                  />
                </div>
                <div
                  className={
                    errorName
                      ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                      : "invisible leading-tight text-[1.2vw]"
                  }
                >
                  {errorMessageName}
                </div>
              </div>
              <div className="basis-[4%]"></div>
              <div className="flex flex-col basis-[48%]">
                <div className="form-group basis-[48%]">
                  <label htmlFor="name">School</label>
                  <input
                    type="text"
                    className={
                      errorSchool
                        ? "text-base bg-white py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all"
                        : "text-base bg-white py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-all"
                    }
                    id="school1"
                    name="school"
                    value={formValues.school}
                    onChange={handleChange}
                    placeholder="School/Organization Name"
                    // required
                  />
                </div>
                <div
                  className={
                    errorSchool
                      ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                      : "invisible leading-tight text-[1.2vw]"
                  }
                >
                  {errorMessageSchool}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col basis-[48%]">
                <div className="form-group basis-[48%]">
                  <label htmlFor="phone">Phone</label>
                  <div className="flex basis-[48%]">
                    <PhoneInput
                      className={
                        errorPhone
                          ? "border border-red-500"
                          : "border border-blue"
                      }
                      country={"in"}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      inputProps={{
                        phone: phone,
                        required: true,
                      }}
                    />
                  </div>
                  <div
                    className={
                      errorPhone
                        ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                        : "invisible leading-tight text-[1.2vw]"
                    }
                  >
                    {errorMessagePhone}
                  </div>
                </div>
              </div>
              <div className="basis-[4%]"></div>
              <div className="flex flex-col basis-[48%]">
                <div className="form-group basis-[48%]">
                  <label htmlFor="email1">Email</label>
                  <input
                    type="text"
                    className={
                      errorEmail
                        ? "text-base bg-white py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all duration-500"
                        : "text-base bg-white py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-all duration-500"
                    }
                    id="email1"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    // aria-describedby="emailHelp"
                    placeholder="name@domain.com"
                    // required
                  />
                </div>
                <div
                  className={
                    errorEmail
                      ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                      : "invisible leading-tight text-[1.2vw]"
                  }
                >
                  {errorMessageEmail}
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="form-group">
                <label htmlFor="message">Your message</label>
                <textarea
                  className={
                    errorMessage
                      ? "text-base bg-white py-3.5 px-4 w-full mb-[-7px] h-full border border-red-500 outline-0 transition-all"
                      : "text-base bg-white py-3.5 px-4 w-full mb-[-7px] h-full border border-blue outline-0 transition-all"
                  }
                  rows="3"
                  id="message1"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  // required
                ></textarea>
              </div>
              <div
                className={
                  errorMessage
                    ? "text-red-500 font-thin leading-tight text-[1.2vw] mb-2"
                    : "invisible leading-tight text-[1.2vw]"
                }
              >
                {errorMessageMessage}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue text-white font-medium text-merri py-[1.2vh] px-[7vh] z-2 text-[2.1vh]  "
            >
              {loading ? (
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <Modal
            style={customStyles}
            isOpen={isOpenModal}
            onRequestClose={closeModal}
            ariaHideApp={false}
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
