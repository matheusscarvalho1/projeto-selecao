import { createContext, useContext, useState } from "react";

// Criação do contexto de autenticação
const AuthContext = createContext({});

// Provedor de autenticação para envolver a aplicação
export const AuthProvider = ({ children }) => {
  // Estados de autenticação e dados relacionados
  const [user, setUser] = useState({
    logged: false,
    email: "",
  });

  const [saldos, setSaldos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [editPayment, setEditPayment] = useState(null);

  // Valor do contexto contendo estados relacionadas à autenticação
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

  // Retorna o provedor de autenticação com o valor do contexto
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para utilizar o contexto de autenticação
const useAuth = () => useContext(AuthContext);

export default useAuth;
