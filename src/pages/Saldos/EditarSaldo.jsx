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
  const descriptionRef = useRef(null);

  useEffect(() => {
    const saldoToUpdate = saldos.find((saldo) => saldo.id.toString() === id);

    if (saldoToUpdate) {
      setSaldo(saldoToUpdate);
      nameRef.current.value = saldoToUpdate.nome;
      valueRef.current.value = saldoToUpdate.valorInicial.toFixed(2);
      descriptionRef.current.value = saldoToUpdate.descricao || "";
    } else {
      navigate("/saldos");
    }
  }, [id, saldos, navigate]);

  const handleUpdateButton = () => {
    let updatedSaldo = {
      ...saldo,
      nome: nameRef.current.value,
    };

    const updatedSaldos = saldos.map((s) =>
      s.id.toString() === id ? updatedSaldo : s
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
            defaultValue={saldo?.nome}
            className={styles.input}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Descrição"
            variant="outlined"
            inputRef={descriptionRef}
            defaultValue={saldo?.descricao || ""}
            disabled
            className={styles.input}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            inputRef={valueRef}
            defaultValue={saldo?.valorInicial.toFixed(2)}
            disabled
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
