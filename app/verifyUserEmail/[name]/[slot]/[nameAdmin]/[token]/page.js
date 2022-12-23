"use client";
import axios from "axios";
import React, { useParams, useState, useEffect } from "react";

const EmailVerification = ({ params }) => {
  // let { token } = useParams();
  let { token } = params;
  let { name } = params;
  let { nameAdmin } = params;
  let { slot } = params;
  const [isValidToken, setIsValidToken] = useState(false);
  const userName = name.replace(/[A-Z]/g, " $&").trim();
  const adminName = nameAdmin.replace(/[A-Z]/g, " $&").trim();
  const verifyEmailToken = () => {
    // console.log(slot);
    axios
      .post("/api/verifyEmail", { userName, token, adminName, slot })
      .then((response) => {
        if (response.status === 200) {
          setIsValidToken(true);
        }
      });
  };
  useEffect(() => {
    verifyEmailToken();
  }, []);
  if (isValidToken) {
    return <div>Thank you for verifying your email</div>;
  } else {
    return <div>EmailVerification</div>;
  }
};

export default EmailVerification;
