import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RegistroPagamento from "./RegistroPagamento";
import { useNavigate } from "react-router-dom";
import styles from "./pagamentos.module.css";
import DeleteModal from "../../components/Modal";

import useAuth from "../../state/auth";

const Pagamentos = () => {
  const navigate = useNavigate();

  const { pagamentos, setPagamentos, nextId, setNextId, setEditPayment } =
    useAuth();

  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    setRows([...pagamentos]);
  }, [pagamentos]);

  const handleEdit = (id) => {
    const paymentToEdit = pagamentos.find((payment) => payment.id === id);

    setEditPayment(paymentToEdit);

    navigate(`/pagamentos/edit/${id}`);
  };

  const handleToggleOpenModal = (id) => {
    setIdToDelete(id);
    setOpenModal(!openModal);
  };

  const handleConfirmModal = () => {
    const updatedPagamentos = pagamentos.filter(
      (pagamento) => pagamento.id !== idToDelete
    );

    // Reordenar os IDs
    const updatedPagamentosWithNewIds = updatedPagamentos.map(
      (pagamento, index) => ({
        ...pagamento,
        id: index + 1,
      })
    );

    setPagamentos(updatedPagamentosWithNewIds);
    setNextId(updatedPagamentos.length + 1); // Atualizar o próximo ID
    setOpenModal(false);
    setIdToDelete(null);
  };

  const handleDelete = (id) => {
    handleToggleOpenModal(id);
  };

  const handleRegister = (data) => {
    // Adicionar o novo pagamento ao estado pagamentos
    const newPagamento = { ...data, id: nextId };
    setPagamentos((prevPagamentos) => [...prevPagamentos, newPagamento]);

    // Atualizar o nextId apenas se o novo item for adicionado
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
      width: 400,
      editable: true,
    },
    {
      field: "acoes",
      headerName: "Ações",
      description: "Editar e apagar registros",
      sortable: false,
      width: 400,
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
          <p>Você não possui pedidos abertos.</p>
          {showForm ? (
            <RegistroPagamento onRegister={handleRegister} />
          ) : (
            <Button
              variant="contained"
              className={styles.btn}
              onClick={handleCreateButton}
            >
              Criar pedido
            </Button>
          )}
        </div>
      ) : (
        <Box className={styles.table}>
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
          <Button
            variant="contained"
            className={styles.btnCreate}
            onClick={handleCreateButton}
          >
            Criar novo pedido
          </Button>
          <DeleteModal
            color="warning"
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
