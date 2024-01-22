import { useRef, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { MenuItem } from "@mui/material";

import { useNavigate } from "react-router-dom";

import useAuth from "../../state/auth";
import Toasty from "../../components/Toasty";

import styles from "./registroPagamento.module.css";
const RegistroPagamento = () => {
  // Hook Glogal (Context API)
  const { saldos, pagamentos, setPagamentos, setSaldos, nextId, setNextId } =
    useAuth();

  const navigate = useNavigate();

  // Hooks de referência
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const valueRef = useRef(null);
  const saldoRef = useRef(null);

  // Hooks de estado
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [saldoError, setSaldoError] = useState(false);
  const [openErrorToasty, setOpenErrorToasty] = useState(false);
  const [openSuccessToasty, setOpenSuccessToasty] = useState(false);

  // Atualiza os saldos com os valores utilizados
  const getSaldosUsados = () => {
    const updatedSaldos = saldos.map((saldo) => {
      const pagamentosDoSaldo = pagamentos.filter(
        (pagamento) => pagamento.saldoId === saldo.id
      );

      const valorUtilizado = pagamentosDoSaldo.reduce(
        (total, pagamento) => total + pagamento.valor,
        0
      );

      return {
        ...saldo,
        valorUtilizado,
        valorRestante: saldo.valorInicial - valorUtilizado,
      };
    });

    setSaldos(updatedSaldos);
  };

  // Hook para atualizar os saldos quando os pagamentos mudam
  useEffect(() => {
    getSaldosUsados();
  }, [pagamentos]);

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

    // Validação do valor do pagamento (deve ser um número válido e maior que zero)
    const parsedValue = parseFloat(valueRef.current.value);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      hasError = true;
      setValueError(true);
    }

    if (hasError) {
      return;
    }

    // Encontrar o saldo selecionado
    const selectedSaldo = saldos.find(
      (saldo) => saldo.id === parseInt(saldoRef.current.value, 10)
    );

    // Se o saldo não for encontrado, exibir mensagem de erro
    if (!selectedSaldo) {
      Toasty({ severity: "error", message: "Saldo não encontrado." });
      return;
    }

    // Valor do pagamento
    const valorPagamento = parsedValue;

    // Verificar se o valor do pagamento ultrapassa o saldo disponível
    if (valorPagamento > selectedSaldo.valorRestante) {
      setOpenErrorToasty(true);
      return;
    }

    // Criar novo pagamento
    const novoPagamento = {
      id: nextId,
      nome: nameRef.current.value,
      descricao: descriptionRef.current.value,
      valor: valorPagamento,
      saldoId: parseInt(saldoRef.current.value, 10),
    };

    // Atualizar o saldo selecionado com os novos valores utilizados
    const saldoAtualizado = {
      ...selectedSaldo,
      valorUtilizado: selectedSaldo.valorUtilizado + valorPagamento,
      valorRestante: selectedSaldo.valorRestante - valorPagamento,
    };

    // Atualizar a lista de saldos com o saldo atualizado
    const saldosAtualizados = saldos.map((saldo) =>
      saldo.id === selectedSaldo.id ? saldoAtualizado : saldo
    );

    setSaldos(saldosAtualizados);

    // Adicionar o novo pagamento à lista de pagamentos
    setPagamentos((prevPagamentos) => [...prevPagamentos, novoPagamento]);

    // Atualizar o ID para o próximo ID disponível
    if (novoPagamento.id === nextId) {
      setNextId(nextId + 1);
    }

    setOpenSuccessToasty(true);

    setTimeout(() => {
      navigate("/pagamentos");
    }, 1500);
  };

  const handleBackButton = () => {
    navigate("/pagamentos");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>Criar pagamento</h2>
      <div className={styles.inputWrapper}>
        <div>
          <TextField
            label="Nome"
            variant="outlined"
            inputRef={nameRef}
            error={nameError}
            className={styles.input}
            helperText={
              nameError && "Por favor preencha o campo 'Nome' corretamente."
            }
          />
        </div>
        <div>
          <TextField
            label="Descrição"
            variant="outlined"
            inputRef={descriptionRef}
            error={descriptionError}
            className={styles.input}
            helperText={
              descriptionError &&
              "Por favor preencha o campo 'Descrição' corretamente."
            }
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
              "Por favor preencha o campo 'Valor' com um valor válido maior que zero para o pagamento."
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
            helperText={saldoError && "Por favor selecione um saldo."}
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
      {openErrorToasty && (
        <Toasty
          open={openErrorToasty}
          severity="error"
          onClose={() => setOpenErrorToasty(false)}
          message="O valor do pagamento ultrapassa o saldo disponível."
        />
      )}
      {openSuccessToasty && (
        <Toasty
          open={openSuccessToasty}
          severity="success"
          onClose={() => setOpenSuccessToasty(false)}
          message="Pagamento registrado com sucesso!"
        />
      )}
    </div>
  );
};

export default RegistroPagamento;
