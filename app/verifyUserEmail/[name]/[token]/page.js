import axios from "axios";
import React, { useParams, useState, useEffect } from "react";

const EmailVerification = () => {
  let { name } = useParams();
  let { token } = useParams();
  const [isValidToken, setIsValidToken] = useState(false);

  const verifyEmailToken = (username, userToken) => {
    axios.post("/api/verifyEmail", { username, userToken }).then((response) => {
      console.log(resposnt);
    });
  };
  useEffect(() => {
    verifyEmailToken(name, token);
  }, []);

  return <div>EmailVerification</div>;
};

export default EmailVerification;
