import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: "",
  });

  const [saldos, setSaldos] = useState([]);

  const [nextId, setNextId] = useState(1);

  const contextValue = {
    user,
    setUser,
    saldos,
    setSaldos,
    nextId,
    setNextId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
