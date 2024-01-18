import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RegistroSaldo from "./RegistroSaldo";
import styles from "./saldos.module.css";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/Modal";

import useAuth from "../../state/auth";

const Saldos = () => {
  const navigate = useNavigate();

  const { saldos, setSaldos, nextId, setNextId } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setRows([...saldos]);
  }, [saldos]);

  //Editar
  const handleEdit = (id) => {
    alert("Editar");
  };

  //DELETAR
  const handleToggleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleConfirmModal = (id) => {
    const updatedSaldos = saldos.filter((saldo) => saldo.id !== id);
    setSaldos(updatedSaldos);

    // Atualizar o nextId apenas se o ID removido for o mais alto
    if (id === nextId - 1) {
      setNextId(nextId - 1);
    }

    setSaldos(updatedSaldos);
    setOpenModal(!openModal);
  };

  const handleRemove = () => {
    handleToggleOpenModal();
  };

  const handleRegister = (data) => {
    // Adicionar o novo saldo ao estado saldos
    setSaldos((prevSaldos) => [...prevSaldos, data]);

    setShowForm(false);
    alert("Registro adicionado");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "descricao", headerName: "Descrição", width: 250 },
    {
      field: "valorInicial",
      headerName: "Valor inicial",
      type: "number",
      width: 250,
      renderCell: (params) => <span>R$ {params.value.toFixed(2)}</span>,
    },
    {
      field: "valorUtilizado",
      headerName: "Valor utilizado",
      type: "number",
      width: 250,
      renderCell: (params) => <span>R$ {params.value.toFixed(2)}</span>,
    },
    {
      field: "valorRestante",
      headerName: "Valor restante",
      type: "number",
      width: 250,
      renderCell: (params) => <span>R$ {params.value.toFixed(2)}</span>,
    },
    {
      field: "acoes",
      headerName: "Ações",
      description: "Editar e apagar registros",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            aria-label="Editar"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Excluir"
            onClick={handleRemove}
          >
            <DeleteIcon />
          </IconButton>
          <DeleteModal
            open={openModal}
            onClose={handleToggleOpenModal}
            onConfirm={() => handleConfirmModal(params.row.id)}
            title="Excluir Pedido?"
            message="Se excluir este pedido, esta ação não poderá ser revertida. Tem certeza que deseja excluir?"
          />
        </>
      ),
    },
  ];

  const handleButton = () => {
    navigate("/saldos/add");
  };

  return (
    <>
      {saldos.length === 0 ? (
        <div className={styles.box}>
          <p>Você não possui saldos.</p>
          {showForm ? (
            <RegistroSaldo onRegister={handleRegister} />
          ) : (
            <Button variant="contained" onClick={handleButton}>
              Criar Novo Saldo
            </Button>
          )}
        </div>
      ) : (
        <Box className={styles.table}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
          <Button
            variant="contained"
            onClick={handleButton}
            className={styles.btnCreate}
          >
            Criar Novo Saldo
          </Button>
        </Box>
      )}
    </>
  );
};

export default Saldos;
