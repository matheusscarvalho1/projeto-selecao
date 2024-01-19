import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: "",
  });

  const [saldos, setSaldos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [editPayment, setEditPayment] = useState(null);

  const contextValue = {
    user,
    setUser,
    saldos,
    setSaldos,
    nextId,
    setNextId,
    pagamentos,
    setPagamentos,
    editPayment,
    setEditPayment,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
