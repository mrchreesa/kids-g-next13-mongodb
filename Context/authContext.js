import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

// const AuthedProfileContext = createContext({});
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authedProfile, setAuthedProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const value = {
    authedProfile,
    setAuthedProfile,
    loading,
  };

  useEffect(() => {
    async function loadSession() {
      axios
        .get("/api/session")
        .then((response) => {
          if (response.status === 200) {
            authedProfile(true);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });

      setLoading(false);
    }
    loadSession();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const useAuthedProfile = () => useContext(AuthedProfileContext);
// export default useAuthedProfile;
export const useAuth = () => useContext(AuthContext);
export default useAuth;
