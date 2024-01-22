import { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import Toasty from "../../components/Toasty";

import useAuth from "../../state/auth";
import { useNavigate } from "react-router-dom";

import styles from "./registroSaldo.module.css";

const RegistroSaldo = () => {
  // Hooks Glogal (Context API)
  const { setSaldos, nextId, setNextId } = useAuth();

  // Hooks de estado e referências
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const valueRef = useRef(null);
  const descriptionRef = useRef(null);

  // Estado para validação dos campos e controle do Toasty
  const [nameError, setNameError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [toastyOpen, setToastyOpen] = useState(false);

  // Manipulador de clique para o botão de registro
  const handleRegisterButton = () => {
    let hasError = false;

    // Validação dos campos
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

    if (!valueRef.current.value || isNaN(valueRef.current.value)) {
      hasError = true;
      setValueError(true);
    } else {
      setValueError(false);
    }

    // Se houver erros, retorna
    if (hasError) {
      return;
    }

    // Criação de um novo saldo
    const novoSaldo = {
      id: nextId,
      nome: nameRef.current.value,
      descricao: descriptionRef.current.value,
      valorInicial: parseFloat(valueRef.current.value),
      valorUtilizado: 0,
      valorRestante: parseFloat(valueRef.current.value),
    };

    // Atualização do estado com o novo saldo e ID
    setSaldos((prevSaldos) => [...prevSaldos, novoSaldo]);
    setNextId((prevId) => prevId + 1);

    // Exibição do Toasty de sucesso e navegação para a página de saldos
    setToastyOpen(true);

    setTimeout(() => {
      navigate("/saldos");
    }, 1500);
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
            error={descriptionError}
            helperText={
              descriptionError && "Preencha o campo 'Descrição' corretamente."
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
            helperText={valueError && "Preencha o campo 'Valor' corretamente."}
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
          onClose={() => setToastyOpen(false)}
          message="Saldo criado com sucesso!"
        />
      </div>
    </div>
  );
};

export default RegistroSaldo;
