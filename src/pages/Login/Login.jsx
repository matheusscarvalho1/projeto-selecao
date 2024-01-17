import { useState } from "react";

import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAuth from "../../state/auth";

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

  return (
    <>
      <Typography variant="h3">Faça seu login</Typography>

      <div style={{ margin: "16px" }}>
        <TextField
          onChange={handleInputChange}
          label="Digite o seu e-mail"
          name="email"
          type="email"
        />
      </div>
      <div style={{ margin: "16px" }}>
        <TextField
          onChange={handleInputChange}
          label="Digite a sua senha"
          name="password"
          type="password"
        />
      </div>
      <div style={{ margin: "16px" }}>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          {isLoading ? "Carregando..." : "Entrar"}
        </Button>
      </div>
    </>
  );
};

export default Login;
