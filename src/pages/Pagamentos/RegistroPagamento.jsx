import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import styles from "./registroPagamento.module.css";
import useAuth from "../../state/auth";
import Toasty from "../../components/Toasty";

const RegistroPagamento = () => {
  const { saldos, setPagamentos, setSaldos, nextId, setNextId } = useAuth();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const valueRef = useRef(null);
  const saldoRef = useRef(null);

  const [nameError, setNameError] = useState(false);
  const [openToasty, setOpenToasty] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [saldoError, setSaldoError] = useState(false);

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

    if (!valueRef.current.value) {
      hasError = true;
      setValueError(true);
    } else {
      setValueError(false);
    }

    if (!saldoRef.current.value) {
      hasError = true;
      setSaldoError(true);
    } else {
      setSaldoError(false);
    }

    // Verificar se o valor é um número válido e maior que zero
    const parsedValue = parseFloat(valueRef.current.value);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      hasError = true;
      setValueError(true);
    }

    if (hasError) {
      return;
    }

    const selectedSaldo = saldos.find(
      (saldo) => saldo.id === parseInt(saldoRef.current.value, 10)
    );

    if (!selectedSaldo) {
      Toasty({ severity: "error", message: "Saldo não encontrado." });
      return;
    }

    const valorPagamento = parsedValue;

    if (valorPagamento > selectedSaldo.valorRestante) {
      setOpenToasty(true);
      return;
    }

    const newPagamento = {
      id: nextId,
      nome: nameRef.current.value,
      descricao: descriptionRef.current.value,
      valor: valorPagamento,
      saldoId: parseInt(saldoRef.current.value, 10),
    };

    const saldoAtualizado = {
      ...selectedSaldo,
      valorUtilizado: selectedSaldo.valorUtilizado + valorPagamento,
      valorRestante: selectedSaldo.valorRestante - valorPagamento,
    };

    const saldosAtualizados = saldos.map((saldo) =>
      saldo.id === selectedSaldo.id ? saldoAtualizado : saldo
    );

    setSaldos(saldosAtualizados);

    setPagamentos((prevPagamentos) => [...prevPagamentos, newPagamento]);

    if (newPagamento.id === nextId) {
      setNextId(nextId + 1);
    }

    navigate("/pagamentos");

    // Exibir o toasty de sucesso
    setOpenToasty(true);
  };

  const handleBackButton = () => {
    navigate("/pagamentos");
  };

  // Redirecionar após alguns segundos e fechar o toasty
  useEffect(() => {
    if (openToasty) {
      const timeout = setTimeout(() => {
        navigate("/pagamentos");
        setOpenToasty(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [openToasty, navigate]);

  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>Registrar</h2>
      <div className={styles.inputWrapper}>
        <div>
          <TextField
            label="Nome"
            variant="outlined"
            inputRef={nameRef}
            error={nameError}
            className={styles.input}
            helperText={nameError && "Por favor, preencha o nome."}
          />
        </div>

        <div>
          <TextField
            label="Descrição"
            variant="outlined"
            inputRef={descriptionRef}
            error={descriptionError}
            className={styles.input}
            helperText={descriptionError && "Por favor, preencha a descrição."}
          />
        </div>

        <div>
          <TextField
            label="Valor"
            variant="outlined"
            inputRef={valueRef}
            error={valueError}
            className={styles.input}
            helperText={
              valueError &&
              "Por favor, preencha um valor válido maior que zero para o pagamento."
            }
            InputProps={{
              startAdornment: <span>R$ </span>,
            }}
          />
        </div>

        <div>
          <TextField
            select
            label="Saldo"
            variant="outlined"
            inputRef={saldoRef}
            error={saldoError}
            className={styles.input}
            helperText={saldoError && "Por favor, selecione um saldo."}
          >
            <MenuItem value="">
              <em>Selecione um saldo</em>
            </MenuItem>
            {saldos.map((saldo) => (
              <MenuItem key={saldo.id} value={saldo.id}>
                {saldo.nome} (R$ {saldo.valorInicial.toFixed(2)}) - Disponível:
                R$ {saldo.valorRestante.toFixed(2)}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>

      <div className={styles.btns}>
        <Button color="blue" variant="outlined" onClick={handleBackButton}>
          Voltar
        </Button>
        <Button color="blue" variant="contained" onClick={handleRegisterButton}>
          Registrar Pagamento
        </Button>
      </div>

      {/* Renderizar o Toasty apenas quando openToasty for verdadeiro */}
      {openToasty && (
        <Toasty
          open={openToasty}
          severity="success"
          onClose={() => setOpenToasty(false)}
          message="Pagamento registrado com sucesso!"
        />
      )}
    </div>
  );
};

export default RegistroPagamento;
