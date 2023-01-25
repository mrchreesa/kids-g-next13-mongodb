import React, { useState } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import axios from "axios";

import "react-phone-input-2/lib/style.css";

const RequestAppointmentsModal = ({
  requestModalOpen,
  isRequestModalClosed,
}) => {
  const initialValues = { name: "", school: "", email: "" };

  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [formValues, setFormValues] = useState(initialValues);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formName, setFormName] = useState("");
  const [formSchool, setFormSchool] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [slotFormDateTime, setFormSlotDateTime] = useState("");

  const [errorMessageName, setErrorMessageName] = useState("Error");
  const [errorMessageSchool, setErrorMessageSchool] = useState("Error");
  const [errorMessagePhone, setErrorMessagePhone] = useState("Error");
  const [errorMessageEmail, setErrorMessageEmail] = useState("Error");
  const [errorSlotDateTimeMessage, setErrorSlotDateTimeMessage] =
    useState("Error");
  const [errorName, setErrorName] = useState(false);
  const [errorSchool, setErrorSchool] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorSlotDateTime, setErrorSlotDateTime] = useState(false);

  const today = new Date();
  const todayFormat = moment(today).format().toString().split(":")[0];

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidName = (name) => {
    const re = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    return re.test(String(name));
  };

  const validateInputs = (e) => {
    e.preventDefault();
    const nameValue = formValues.name.trim();
    const emailValue = formValues.email.trim();
    let formIsValid = true;

    if (formValues.name === "") {
      setErrorMessageName("Name is required");
      setErrorName(true);
      formIsValid = false;
    } else if (!isValidName(nameValue)) {
      setErrorMessageName("Name should be 3-26 characters");
      setErrorName(true);
      formIsValid = false;
    } else {
      setErrorName(false);
      // setFormName(formValues.name);
    }
    if (formValues.school === "") {
      setErrorMessageSchool("School is required");
      setErrorSchool(true);
      formIsValid = false;
    } else {
      // setFormSchool(formValues.school);
      setErrorSchool(false);
    }
    if (phone === "") {
      setErrorMessagePhone("Phone number is required");
      setErrorPhone(true);
      formIsValid = false;
    } else if (phone.length < 10) {
      setErrorMessagePhone("Please provide a valid phone number");
      setErrorPhone(true);
      formIsValid = false;
    } else {
      setErrorPhone(false);
      // setFormPhone(phone);
    }
    if (formValues.email === "") {
      setErrorMessageEmail("Email is required");
      setErrorEmail(true);
      formIsValid = false;
    } else if (!isValidEmail(emailValue)) {
      setErrorMessageEmail("Provide a valid email address");
      setErrorEmail(true);
      formIsValid = false;
    } else {
      setErrorEmail(false);
      // setFormEmail(formValues.email);
    }
    if (date === "") {
      setErrorSlotDateTime(true);
      setErrorSlotDateTimeMessage("Please provide date and time");
      formIsValid = false;
    } else {
      setErrorSlotDateTime(false);
    }
    return formIsValid;
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
      display: "flex",
      justifyContent: "center",
      marginRight: "-50%",
      borderRadius: "25px",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      date: date,
      name: formValues.name,
      school: formValues.school,
      phone: phone,
      email: formValues.email,
    };
    if (validateInputs(e)) {
      console.log("Verification passed!");
      setLoading(true);
      axios
        .post("/api/requestAppointments", data)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            isRequestModalClosed();
            setLoading(false);
            setFormValues(initialValues);
            setPhone("");
            setDate("");
            alert(
              "Thank you for submitting a request with us! You will receive a confirmation email!"
            );
          } else if (response.status === 202) {
            alert(
              "You have already submitted a request with us and we will get back to you soon!"
            );
            setFormValues(initialValues);
            setPhone("");
            setDate("");

            isRequestModalClosed();
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Verification failed");
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleDateChange = (e) => {
    e.preventDefault();
    const date = e.target.value;
    setDate(date);
  };

  //Separation of the Date and Time for UI
  const dateToDate = (time) => {
    return moment(time).format("Do MMMM YYYY");
  };
  const dateToTime = (time) => {
    return moment(time).format("HH:mm");
  };
  return (
    <Modal
      style={customStyles}
      isOpen={requestModalOpen}
      onRequestClose={isRequestModalClosed}
      ariaHideApp={false}
    >
      <div className=" w-full  lg:w-5/6">
        {" "}
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
          <h2 className="text-[3vh] text-center text-merri mb-4">
            Make a request for an appointment:
          </h2>

          <div className="flex">
            <div className="flex flex-col basis-[48%]">
              <div className="form-group basis-[48%]">
                <label htmlFor="name">Date</label>

                <input
                  type="datetime-local"
                  min={todayFormat + ":00"}
                  value={date}
                  onChange={handleDateChange}
                  className={
                    errorSlotDateTime
                      ? "text-base bg-white py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all"
                      : "text-base bg-white py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-all"
                  }
                />
                <div
                  className={
                    errorSlotDateTime
                      ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                      : "invisible leading-tight text-[1.2vw]"
                  }
                >
                  {errorSlotDateTimeMessage}
                </div>
              </div>

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
              <div className="form-group basis-[48%] mb-5"></div>
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
          <button
            type="submit"
            className="bg-blue text-white font-medium text-merri py-[1.2vh] px-[7vh] z-2 text-[2.1vh] mb-3 "
          >
            {loading ? (
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RequestAppointmentsModal;
