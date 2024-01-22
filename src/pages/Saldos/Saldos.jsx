import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../components/Modal";
import Toasty from "../../components/Toasty";

import useAuth from "../../state/auth";

import styles from "./saldos.module.css";

const Saldos = () => {
  // Hooks Glogal (Context API)
  const { saldos, setSaldos, pagamentos } = useAuth();

  const navigate = useNavigate();

  // useStates
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [toastySeverity, setToastySeverity] = useState("success");
  const [toastyMessage, setToastyMessage] = useState("");

  const [openToasty, setOpenToasty] = useState(false);

  // Hook para atualizar os dados da tabela quando há alterações nos saldos ou pagamentos
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
        descricao: saldo.descricao,
      };
    });

    setRows(updatedSaldos);
  }, [saldos, pagamentos]);

  // Função para verificar se há pagamentos vinculados a um saldo
  const hasPaymentsLinkedToSaldo = (saldoId) => {
    return pagamentos.some((pagamento) => pagamento.saldoId === saldoId);
  };

  // Função para navegar até a página de edição de um saldo
  const handleEdit = (id) => {
    navigate(`/saldos/edit/${id}`);
  };

  // Função para iniciar a exclusão de um saldo
  const handleRemove = (id) => {
    const saldoToDelete = saldos.find((saldo) => saldo.id === id);
    if (saldoToDelete) {
      handleToggleOpenModal(id);
    }
  };

  // Função para abrir ou fechar o modal de exclusão
  const handleToggleOpenModal = (id) => {
    setIdToDelete(id);
    setOpenModal(!openModal);
  };

  // Função chamada ao confirmar a exclusão no modal
  const handleConfirmModal = () => {
    if (idToDelete !== null) {
      const saldoToDelete = saldos.find((saldo) => saldo.id === idToDelete);

      if (saldoToDelete && hasPaymentsLinkedToSaldo(idToDelete)) {
        setToastySeverity("error");
        setToastyMessage(
          "Não é possível excluir, pois existem pagamentos vinculados a esse saldo. Para apagar este saldo, primeiro apague os pagamentos vinculados a ele."
        );
        setOpenToasty(true);
        return;
      }

      const updatedSaldos = saldos.filter((saldo) => saldo.id !== idToDelete);
      const updatedSaldosWithNewIds = updatedSaldos.map((saldo, index) => ({
        ...saldo,
        id: index + 1,
      }));

      setSaldos(updatedSaldosWithNewIds);
      setOpenModal(false);
      setIdToDelete(null);
    }
  };

  // Função para fechar o Toasty
  const handleToastyClose = () => {
    setOpenToasty(false);
  };

  // Função para navegar até a página de adição de um novo saldo
  const handleCreateButton = () => {
    navigate("/saldos/add");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome", width: 250 },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 250,
      renderCell: (params) => <span>{params.value}</span>,
    },
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
          <Button
            color="blue"
            variant="contained"
            className={styles.btn}
            onClick={handleCreateButton}
          >
            Criar Saldo
          </Button>
        </div>
      ) : (
        <Box className={styles.table}>
          <div className={styles.title}>
            <div>
              <h2>Registre aqui seus saldos</h2>
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
            pageSize={5}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            rowId="id"
          />

          <DeleteModal
            color="red"
            open={openModal}
            onClose={handleToggleOpenModal}
            onConfirm={handleConfirmModal}
            title="Excluir Saldo?"
            message="Se excluir este saldo, esta ação não poderá ser revertida. Tem certeza que deseja excluir?"
          />

          <Toasty
            open={openToasty}
            severity={toastySeverity}
            onClose={handleToastyClose}
            message={toastyMessage}
          />
        </Box>
      )}
    </>
  );
};

export default Saldos;
