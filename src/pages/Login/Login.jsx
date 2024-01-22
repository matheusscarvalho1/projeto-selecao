import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../state/auth";
import Toasty from "../../components/Toasty"; // Certifique-se de importar o componente Toasty
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showToasty, setShowToasty] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

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

      // Navega para a página inicial após 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 3000);
  };

  const handleBack = () => {
    navigate("/");
  };

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
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          {isLoading ? "Carregando..." : "Entrar"}
        </Button>
        <Button onClick={() => handleBack()} variant="outlined" color="primary">
          Voltar
        </Button>
      </div>

      {/* Componente Toasty para exibir a mensagem de sucesso */}
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
