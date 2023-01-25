"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const EmailVerification = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  let { token } = params;
  let { name } = params;
  let { nameAdmin } = params;
  let { slot } = params;
  const [isValidToken, setIsValidToken] = useState(false);
  const userName = name.replace(/[A-Z]/g, " $&").trim();
  const adminName = nameAdmin.replace(/[A-Z]/g, " $&").trim();
  const verifyEmailToken = () => {
    setIsLoading(true);
    axios
      .post("/api/verifyEmail", { userName, token, adminName, slot })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setIsValidToken(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);

        return;
      });
  };
  useEffect(() => {
    verifyEmailToken();
  }, []);
  if (!isLoading) {
    if (isValidToken) {
      return (
        <div>
          Thank you for verifying your email. Your appointment is now Booked.
        </div>
      );
    } else {
      return <div>EmailVerification</div>;
    }
  } else {
    return (
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
    );
  }
};

export default EmailVerification;
