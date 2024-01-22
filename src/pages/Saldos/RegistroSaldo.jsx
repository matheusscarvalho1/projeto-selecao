import { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import Toasty from "../../components/Toasty";
import styles from "./registroSaldo.module.css";
import useAuth from "../../state/auth";
import { useNavigate } from "react-router-dom";

const RegistroSaldo = () => {
  const { setSaldos, nextId, setNextId } = useAuth();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const valueRef = useRef(null);
  const descriptionRef = useRef(null);

  const [nameError, setNameError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [toastyOpen, setToastyOpen] = useState(false);

  const handleRegisterButton = () => {
    let hasError = false;

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

    if (hasError) {
      return;
    }

    const novoSaldo = {
      id: nextId,
      nome: nameRef.current.value,
      descricao: descriptionRef.current.value,
      valorInicial: parseFloat(valueRef.current.value),
      valorUtilizado: 0,
      valorRestante: parseFloat(valueRef.current.value),
    };

    setSaldos((prevSaldos) => [...prevSaldos, novoSaldo]);
    setNextId((prevId) => prevId + 1);

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
