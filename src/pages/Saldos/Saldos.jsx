import { useState, useEffect } from "react";
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

  const { saldos, setSaldos, nextId, setNextId, pagamentos } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
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

    setRows(updatedSaldos);
  }, [saldos, pagamentos]);

  const handleEdit = (id) => {
    navigate(`/saldos/edit/${id}`);
  };

  const handleToggleOpenModal = (id) => {
    setIdToDelete(id);
    setOpenModal(!openModal);
  };

  const handleConfirmModal = () => {
    const updatedSaldos = saldos.filter((saldo) => saldo.id !== idToDelete);

    // Reordenar os IDs
    const updatedSaldosWithNewIds = updatedSaldos.map((saldo, index) => ({
      ...saldo,
      id: index + 1,
    }));

    setSaldos(updatedSaldosWithNewIds);
    setOpenModal(false);
    setIdToDelete(null);
  };

  const handleRemove = (id) => {
    handleToggleOpenModal(id);
  };

  const handleRegister = (data) => {
    // Adicionar o novo saldo ao estado saldos
    const newSaldo = { ...data, id: nextId };
    setSaldos((prevSaldos) => [...prevSaldos, newSaldo]);

    // Atualizar o nextId apenas se o novo item for adicionado
    if (newSaldo.id === nextId) {
      setNextId(nextId + 1);
    }

    setShowForm(false);
    alert("Registro adicionado");
  };

  const handleCreateButton = () => {
    navigate("/saldos/add");
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
            onClick={() => handleRemove(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      {saldos.length === 0 ? (
        <div className={styles.box}>
          <p>Você não possui saldos.</p>
          {showForm ? (
            <RegistroSaldo onRegister={handleRegister} />
          ) : (
            <Button variant="contained" onClick={handleCreateButton}>
              Criar Saldo
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
            rowId="id"
          />
          <Button
            variant="contained"
            onClick={handleCreateButton}
            className={styles.btnCreate}
          >
            Criar Novo Saldo
          </Button>
          <DeleteModal
            color="warning"
            open={openModal}
            onClose={handleToggleOpenModal}
            onConfirm={handleConfirmModal}
            title="Excluir Pedido?"
            message="Se excluir este pedido, esta ação não poderá ser revertida. Tem certeza que deseja excluir?"
          />
        </Box>
      )}
    </>
  );
};

export default Saldos;
