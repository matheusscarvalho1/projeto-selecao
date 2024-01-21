import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import styles from "./pagamentos.module.css";
import DeleteModal from "../../components/Modal";

import RegistroPagamento from "./RegistroPagamento";
import useAuth from "../../state/auth";

const Pagamentos = () => {
  const navigate = useNavigate();

  const {
    pagamentos,
    setPagamentos,
    nextId,
    setNextId,
    setEditPayment,
    saldos,
  } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    const updatedRows = pagamentos.map((pagamento) => ({
      ...pagamento,
      saldoUsado: getSaldosUsados(pagamento.saldoId),
    }));
    setRows(updatedRows);
  }, [pagamentos, saldos]);

  const getSaldosUsados = (saldoId) => {
    const saldo = saldos.find((s) => s.id === saldoId);
    return saldo ? saldo.nome : "Saldo não encontrado";
  };

  const handleEdit = (id) => {
    const paymentToEdit = pagamentos.find((payment) => payment.id === id);
    setEditPayment(paymentToEdit);
    navigate(`/pagamentos/edit/${id}`);
  };

  const handleConfirmModal = () => {
    if (idToDelete !== null) {
      const updatedPagamentos = pagamentos.filter(
        (pagamento) => pagamento.id !== idToDelete
      );

      const updatedPagamentosWithNewIds = updatedPagamentos.map(
        (pagamento, index) => ({
          ...pagamento,
          id: index + 1,
        })
      );

      setPagamentos(updatedPagamentosWithNewIds);
      setNextId(updatedPagamentos.length + 1);
      setOpenModal(false);
      setIdToDelete(null);
    }
  };

  const handleToggleOpenModal = (id) => {
    setIdToDelete(id);
    setOpenModal(!openModal);
  };

  const handleDelete = (id) => {
    if (pagamentos && pagamentos.length > 0) {
      const pagamentoToDelete = pagamentos.find(
        (pagamento) => pagamento.id === id
      );
      if (pagamentoToDelete) {
        handleToggleOpenModal(id);
      }
    }
  };

  const handleRegister = (data) => {
    const newPagamento = {
      ...data,
      id: nextId,
      saldoUsado: getSaldosUsados(data.saldoId),
    };
    setPagamentos((prevPagamentos) => [...prevPagamentos, newPagamento]);

    if (newPagamento.id === nextId) {
      setNextId(nextId + 1);
    }

    setShowForm(false);
    alert("Registro adicionado");
  };

  const handleCreateButton = () => {
    navigate("/pagamentos/add");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "nome",
      headerName: "Nome",
      width: 400,
      editable: true,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 400,
      editable: true,
    },
    {
      field: "valor",
      headerName: "Valor",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "saldoUsado",
      headerName: "Saldo vinculado",
      width: 200,
    },
    {
      field: "acoes",
      headerName: "Ações",
      description: "Editar e apagar registros",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
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
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      {rows.length === 0 ? (
        <div className={styles.box}>
          <p>Você não possui pagamentos registrados.</p>
          {showForm ? (
            <RegistroPagamento onRegister={handleRegister} />
          ) : (
            <Button
              color="blue"
              variant="contained"
              className={styles.btn}
              onClick={handleCreateButton}
            >
              Criar pagamento
            </Button>
          )}
        </div>
      ) : (
        <Box className={styles.table}>
          <div className={styles.title}>
            <div>
              <h2>Registre aqui seus pagamentos</h2>
            </div>
            <Button
              color="blue"
              variant="contained"
              onClick={handleCreateButton}
              className={styles.btnCreate}
            >
              Criar Novo Saldo
            </Button>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />

          <DeleteModal
            color="red"
            open={openModal}
            onClose={handleToggleOpenModal}
            onConfirm={handleConfirmModal}
            title="Excluir Pagamento?"
            message="Se excluir este pagamento, esta ação não poderá ser revertida. Tem certeza que deseja excluir?"
          />
        </Box>
      )}
    </>
  );
};

export default Pagamentos;
