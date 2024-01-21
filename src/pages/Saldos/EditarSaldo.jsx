import React, { useState, useRef, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import useAuth from "../../state/auth";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./registroSaldo.module.css";

const EditSaldo = () => {
  const { saldos, setSaldos } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [saldo, setSaldo] = useState(null);
  const nameRef = useRef(null);
  const valueRef = useRef(null);
  const descriptionRef = useRef(null); // Adição: referência para o campo de descrição

  const [nameError, setNameError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false); // Adição: estado para erro de descrição

  useEffect(() => {
    const saldoToUpdate = saldos.find((saldo) => saldo.id.toString() === id);

    if (saldoToUpdate) {
      setSaldo(saldoToUpdate);
      nameRef.current.value = saldoToUpdate.nome;
      valueRef.current.value = saldoToUpdate.valorInicial.toString();
      descriptionRef.current.value = saldoToUpdate.descricao || ""; // Adição: definir descrição se existir
    } else {
      // Handle case where saldo with given id is not found
      navigate("/saldos");
    }
  }, [id, saldos, navigate]);

  const handleUpdateButton = () => {
    let hasError = false;

    if (!nameRef.current.value) {
      hasError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!valueRef.current.value) {
      hasError = true;
      setValueError(true);
    } else {
      setValueError(false);
    }

    if (isNaN(valueRef.current.value)) {
      hasError = true;
      setValueError(true);
    }

    // Adição: Verificar se há erro na descrição
    if (descriptionRef.current.value.length > 100) {
      hasError = true;
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    if (hasError) {
      return;
    }

    const updatedSaldos = saldos.map((s) =>
      s.id.toString() === id
        ? {
            ...s,
            nome: nameRef.current.value,
            valorInicial: parseFloat(valueRef.current.value),
            descricao: descriptionRef.current.value, // Adição: incluir descrição
            valorUtilizado: parseFloat(valueRef.current.value),
            valorRestante: 0,
          }
        : s
    );

    setSaldos(updatedSaldos);

    navigate("/saldos");
  };

  const handleBackButton = () => {
    navigate("/saldos");
  };

  return (
    <div className={styles.container}>
      <h1>Editar Saldo</h1>
      <div className={styles.inputWrapper}>
        <div>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            inputRef={nameRef}
            error={nameError}
            helperText={nameError && "Digite o campo 'Nome' corretamente."}
            className={styles.input}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Descrição"
            variant="outlined"
            inputRef={descriptionRef}
            error={descriptionError}
            helperText={
              descriptionError &&
              "A descrição não pode ter mais de 100 caracteres."
            }
            className={styles.input}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            inputRef={valueRef}
            error={valueError}
            helperText={valueError && "Digite o campo 'Valor' corretamente."}
            className={styles.input}
            InputProps={{
              startAdornment: <span>R$ </span>,
            }}
          />
        </div>
      </div>
      <div className={styles.btns}>
        <Button variant="outlined" color="primary" onClick={handleBackButton}>
          Voltar
        </Button>
        <Button variant="contained" onClick={handleUpdateButton}>
          Atualizar
        </Button>
      </div>
    </div>
  );
};

export default EditSaldo;
