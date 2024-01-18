import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import styles from "./pagamentos.module.css";

const handleEdit = (id) => {
  alert("Editar");
};

const handleDelete = (id) => {
  alert("Excluir");
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "primeiroNome",
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

const rows = [];

const Pagamentos = () => {
  const navigate = useNavigate();
  const handleCreateButton = () => {
    navigate("/pagamentos/add");
  };
  return (
    <>
      {rows.length === 0 ? (
        <div className={styles.box}>
          <p>Você não possui pedidos abertos.</p>
          <Button
            variant="contained"
            className={styles.btn}
            onClick={handleCreateButton}
          >
            Criar pedido
          </Button>
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
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
          <Button
            variant="contained"
            className={styles.lastBtn}
            onClick={() => alert("Criar")}
          >
            Criar
          </Button>
        </Box>
      )}
    </>
  );
};

export default Pagamentos;
