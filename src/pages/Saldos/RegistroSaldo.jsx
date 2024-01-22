import React, { useState, useRef, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Toasty from "../../components/Toasty";
import styles from "./registroSaldo.module.css";
import useAuth from "../../state/auth";
import { useNavigate } from "react-router-dom";

const RegistroSaldo = ({ onRegister }) => {
  // Estado e funções do contexto de autenticação
  const { setSaldos, nextId, setNextId } = useAuth();
  const navigate = useNavigate();

  // Referências para os campos de entrada
  const nameRef = useRef(null);
  const valueRef = useRef(null);
  const descriptionRef = useRef(null);

  // Estados
  const [nameError, setNameError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [toastyOpen, setToastyOpen] = useState(false);

  // Função para lidar com o botão de cadastrar
  const handleRegisterButton = () => {
    // Flag para indicar se há erros nos campos
    let hasError = false;

    // Validação do campo 'Nome'
    if (!nameRef.current.value) {
      hasError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!descriptionRef.current.value) {
      hasError = true;
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    // Validação do formulário
    if (!valueRef.current.value || isNaN(valueRef.current.value)) {
      hasError = true;
      setValueError(true);
    } else {
      setValueError(false);
    }

    // Interromper a execução caso tenha erros
    if (hasError) {
      return;
    }

    // Criar um novo saldo com os valores fornecidos nos inputs
    const novoSaldo = {
      id: nextId,
      nome: nameRef.current.value,
      descricao: descriptionRef.current.value,
      valorInicial: parseFloat(valueRef.current.value),
      valorUtilizado: 0,
      valorRestante: parseFloat(valueRef.current.value),
    };

    // Atualizar o estado de saldos com o novo saldo
    setSaldos((prevSaldos) => [...prevSaldos, novoSaldo]);

    // Atualizar o próximo ID
    setNextId((prevId) => prevId + 1);

    // Limpar os campos de entrada
    nameRef.current.value = "";
    valueRef.current.value = "";
    descriptionRef.current.value = "";

    // Abrir o Toasty antes de redirecionar
    setToastyOpen(true);
  };

  // Redirecionar após alguns segundos
  useEffect(() => {
    if (toastyOpen) {
      const timeout = setTimeout(() => {
        navigate("/saldos");
        setToastyOpen(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [toastyOpen, navigate]);

  // Função para lidar com o fechamento do Toasty
  const handleToastyClose = () => {
    setToastyOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.subTitle}>Criar saldo</h1>
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
              descriptionError && "Digite o campo 'Descrição' corretamente."
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
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/saldos")}
        >
          Voltar
        </Button>
        <Button color="blue" variant="contained" onClick={handleRegisterButton}>
          Cadastrar
        </Button>
        <Toasty
          open={toastyOpen}
          severity="success"
          onClose={handleToastyClose}
          message="Saldo criado com sucesso!"
        />
      </div>
    </div>
  );
};

export default RegistroSaldo;
