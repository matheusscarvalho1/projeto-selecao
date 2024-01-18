import { useContext, createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: "",
  });

  const [saldos, setSaldos] = useState([]);
  const [nameSaldo, setNameSaldo] = useState("");
  //A aplicação toda irá ter acesso a esse state
  return (
    <AuthContext.Provider
      value={{ user, setUser, saldos, setSaldos, nameSaldo, setNameSaldo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
