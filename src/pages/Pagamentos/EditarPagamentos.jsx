import React, { useState, useRef, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useAuth from "../../state/auth";
import styles from "./registroPagamento.module.css";
import Toasty from "../../components/Toasty";
import { useNavigate, useParams } from "react-router-dom";

const EditPagamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { saldos, pagamentos, setPagamentos, editPayment } = useAuth();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const valueRef = useRef(null);
  const saldoRef = useRef(null);

  const [nameError, setNameError] = useState(false);
  const [toastyOpen, setToastyOpen] = useState(false);

  useEffect(() => {
    if (editPayment && editPayment.id.toString() === id) {
      nameRef.current.value = editPayment.nome;
      descriptionRef.current.value = editPayment.descricao;
      valueRef.current.value = editPayment.valor.toString();
      saldoRef.current.value = editPayment.saldoId;
    }
  }, [editPayment, id, saldos]);

  const handleRegisterButton = () => {
    let hasError = false;

    if (!nameRef.current.value) {
      hasError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (hasError) {
      return;
    }

    const updatedPagamentos = pagamentos.map((pagamento) =>
      pagamento.id.toString() === id
        ? {
            ...pagamento,
            nome: nameRef.current.value,
          }
        : pagamento
    );

    setPagamentos(updatedPagamentos);

    // Exibir toasty e redirecionar após 2 segundos
    setToastyOpen(true);
    setTimeout(() => {
      setToastyOpen(false);
      navigate("/pagamentos");
    }, 2000);
  };

  const handleBackButton = () => {
    navigate("/pagamentos");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.subTitle}>Editar pedido</h1>
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
            defaultValue={editPayment?.descricao}
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
            defaultValue={editPayment?.valor}
            disabled
            className={styles.input}
          />
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="select-saldo-label">
                Selecione o saldo a utilizar
              </InputLabel>
              <Select
                labelId="select-saldo-label"
                id="select-saldo"
                value={saldoRef.current?.value || ""}
                inputRef={saldoRef}
                label="Selecione o saldo a utilizar"
                disabled
              >
                <MenuItem value="" disabled>
                  Selecione um saldo
                </MenuItem>
                {saldos.map((saldo) => (
                  <MenuItem key={saldo.id} value={saldo.id}>
                    {saldo.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className={styles.btns}>
        <Button variant="outlined" color="primary" onClick={handleBackButton}>
          Voltar
        </Button>
        <Button variant="contained" onClick={handleRegisterButton}>
          Salvar alterações
        </Button>
      </div>

      {toastyOpen && (
        <Toasty
          open={toastyOpen}
          onClose={() => setToastyOpen(false)}
          severity="success"
          message="Pedido atualizado com sucesso!"
        />
      )}
    </div>
  );
};

export default EditPagamento;
