import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAuth from "../../state/auth";

import Toasty from "../../components/Toasty";

import styles from "./login.module.css";

const Login = () => {
  // Hooks Glogal (Context API)
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  // Estado para armazenar os dados do formulário
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Estado para controle da simulação de carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Estado para exibir ou esconder o componente Toasty
  const [showToasty, setShowToasty] = useState(false);

  // Manipulador de alteração nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Manipulador de envio do formulário
  const handleFormSubmit = () => {
    setIsLoading(true);

    // Simula uma chamada assíncrona (por exemplo, autenticação com uma API)
    setTimeout(() => {
      setUser({
        logged: true,
        email: form.email,
      });

      setIsLoading(false);
      setShowToasty(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 2000);
  };

  const handleBack = () => {
    navigate("/");
  };

  // Manipulador de fechamento do componente Toasty
  const handleToastyClose = () => {
    setShowToasty(false);
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
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Entrar"}
        </Button>
        <Button
          onClick={handleBack}
          variant="outlined"
          color="primary"
          disabled={isLoading}
        >
          Voltar
        </Button>
      </div>
      <Toasty
        open={showToasty}
        severity="success"
        onClose={handleToastyClose}
        message="Login efetuado com sucesso!"
      />
    </>
  );
};

export default Login;
