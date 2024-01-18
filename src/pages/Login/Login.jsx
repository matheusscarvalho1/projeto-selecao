import { useState } from "react";

import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAuth from "../../state/auth";

import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = () => {
    setIsLoading(true);

    setTimeout(() => {
      setUser({
        logged: true,
        email: form.email,
      });

      navigate("/");
    }, 3000);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.form}>
        <TextField
          onChange={handleInputChange}
          label="Digite o seu e-mail"
          name="email"
          type="email"
        />

        <TextField
          onChange={handleInputChange}
          label="Digite a sua senha"
          name="password"
          type="password"
        />

        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          {isLoading ? "Carregando..." : "Entrar"}
        </Button>
        <Button onClick={() => handleBack()} variant="outlined" color="primary">
          Voltar{" "}
        </Button>
      </div>
    </>
  );
};

export default Login;
