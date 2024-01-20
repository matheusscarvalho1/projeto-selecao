// RegistroPagamento.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import styles from "./registroPagamento.module.css";
import useAuth from "../../state/auth";

const RegistroPagamento = () => {
  const { saldos, setPagamentos, setSaldos, nextId, setNextId } = useAuth();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const valueRef = useRef(null);
  const saldoRef = useRef(null);

  const [nameError, setNameError] = useState(false);
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

    if (isNaN(valueRef.current.value)) {
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
      // Handle case where selected saldo is not found
      return;
    }

    // Verificar se o valor do pagamento não ultrapassa o saldo disponível
    const valorPagamento = parseFloat(valueRef.current.value);
    if (valorPagamento > selectedSaldo.valorRestante) {
      alert("O valor do pagamento ultrapassa o saldo disponível.");
      console.log(
        `O valor do pagamento é ${valorPagamento} e o saldo disponível é ${selectedSaldo.valorRestante}.`
      );
      return;
    }

    const newPagamento = {
      id: nextId,
      nome: nameRef.current.value,
      descricao: descriptionRef.current.value,
      valor: valorPagamento,
      saldoId: parseInt(saldoRef.current.value, 10),
    };

    // Atualizar o saldo
    const saldoAtualizado = {
      ...selectedSaldo,
      valorUtilizado: selectedSaldo.valorUtilizado + valorPagamento,
      valorRestante: selectedSaldo.valorRestante - valorPagamento,
    };

    // Atualizar a lista de saldos
    const saldosAtualizados = saldos.map((saldo) =>
      saldo.id === selectedSaldo.id ? saldoAtualizado : saldo
    );

    // Atualizar o estado dos saldos
    setSaldos(saldosAtualizados);
    console.log("Saldos Atualizados:", saldosAtualizados);

    // Adicionar o novo pagamento ao estado de pagamentos
    setPagamentos((prevPagamentos) => [...prevPagamentos, newPagamento]);

    // Atualizar o próximo ID apenas se o novo item for adicionado
    if (newPagamento.id === nextId) {
      setNextId(nextId + 1);
    }

    // Redirecionar para a página de pagamentos
    navigate("/pagamentos");
  };

  const handleBackButton = () => {
    navigate("/pagamentos");
  };

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
              "Por favor, preencha um valor válido para o pagamento."
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
    </div>
  );
};

export default RegistroPagamento;
