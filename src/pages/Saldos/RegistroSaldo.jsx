import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./registroSaldo.module.css";

import { useNavigate } from "react-router-dom";

const RegistroSaldo = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: {
      value: "",
      error: false,
    },
    value: {
      value: "",
      error: false,
    },
  });

  const [nextId, setNextId] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: {
        value,
        error: false, // Resetando o erro ao digitar
      },
    });
  };

  const handleRegisterButton = () => {
    let hasError = false;
    let newFormState = { ...form };

    if (!form.name.value) {
      hasError = true;

      newFormState.name = {
        value: form.name.value,
        error: true,
        helperText: "Digite o campo 'Nome' corretamente.",
      };
    }

    if (!form.value.value) {
      hasError = true;

      newFormState.value = {
        value: form.value.value,
        error: true,
        helperText: "Digite o campo 'Valor' corretamente.",
      };
    }

    if (hasError) {
      return setForm(newFormState);
    }

    setForm({
      name: { value: "", error: false },
      value: { value: "", error: false },
    });

    setNextId((prevId) => prevId + 1);
    console.log(form);
    navigate("/saldos", {
      state: {
        nome: form.name.value,
        valor: form.value.value,
      },
    });
  };

  const handleBackButton = () => {
    // Utilize navigate para voltar para a rota /saldos
    navigate("/saldos");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.subTitle}>Criar saldo</h1>
      <div className={styles.inputWrapper}>
        <div>
          <TextField
            error={form.name.error}
            helperText={form.name.error ? form.name.helperText : ""}
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            value={form.name.value}
            name="name"
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div>
          <TextField
            error={form.value.error}
            helperText={form.value.error ? form.value.helperText : ""}
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            value={form.value.value}
            name="value"
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.btns}>
        <Button variant="outlined" color="primary" onClick={handleBackButton}>
          Voltar
        </Button>
        <Button variant="contained" onClick={handleRegisterButton}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default RegistroSaldo;
