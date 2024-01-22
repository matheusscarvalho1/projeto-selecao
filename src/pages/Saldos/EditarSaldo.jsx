import { useState, useRef, useEffect } from "react";
import { TextField, Button } from "@mui/material";

import useAuth from "../../state/auth";

import { useNavigate, useParams } from "react-router-dom";

import Toasty from "../../components/Toasty";

import styles from "./registroSaldo.module.css";

const EditSaldo = () => {
  // Hooks Glogal (Context API)
  const { saldos, setSaldos } = useAuth();

  const navigate = useNavigate();

  // Rota com parâmetros de ID
  const { id } = useParams();

  // Hooks de estado e referências
  const [nameError, setNameError] = useState(false);
  const [toastyOpen, setToastyOpen] = useState(false);
  const [saldo, setSaldo] = useState(null);
  const nameRef = useRef(null);
  const valueRef = useRef(null);
  const descriptionRef = useRef(null);

  // Hook para carregar dados do saldo ao montar o componente
  useEffect(() => {
    // Encontrar o saldo correspondente ao ID na URL
    const saldoToUpdate = saldos.find((saldo) => saldo.id.toString() === id);

    if (saldoToUpdate) {
      // Atualizar o estado com os dados do saldo
      setSaldo(saldoToUpdate);
      nameRef.current.value = saldoToUpdate.nome;
      valueRef.current.value = saldoToUpdate.valorInicial.toFixed(2);
      descriptionRef.current.value = saldoToUpdate.descricao || "";
    } else {
      navigate("/saldos");
    }
  }, [id, saldos, navigate]);

  const handleUpdateButton = () => {
    let hasError = false;

    // Validar o campo 'Nome'
    if (!nameRef.current.value) {
      hasError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }

    // Se houver erro, retornar
    if (hasError) {
      return;
    }

    // Atualizar os dados do saldo
    let updatedSaldo = {
      ...saldo,
      nome: nameRef.current.value,
    };

    // Atualizar a lista de saldos
    const updatedSaldos = saldos.map((saldo) =>
      saldo.id.toString() === id ? updatedSaldo : saldo
    );

    setSaldos(updatedSaldos);

    setToastyOpen(true);
    setTimeout(() => {
      setToastyOpen(false);
      navigate("/saldos");
    }, 2000);
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
            error={nameError}
            helperText={nameError && "Preencha o campo 'Nome' corretamente."}
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
      <Toasty
        open={toastyOpen}
        onClose={() => setToastyOpen(false)}
        severity="success"
        message="Saldo atualizado com sucesso!"
      />
    </div>
  );
};

export default EditSaldo;
