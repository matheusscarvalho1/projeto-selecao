import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const handleEdit = (id) => {
  alert("Editar");
};

const handleDelete = (id) => {
  alert("Excluir");
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "nome",
    headerName: "Nome",
    width: 250,
  },
  {
    field: "descricao",
    headerName: "Descrição",
    width: 250,
  },
  {
    field: "valorInicial",
    headerName: "Valor inicial",
    type: "number",
    width: 250,
  },
  {
    field: "valorUtilizado",
    headerName: "Valor utilizado",
    type: "number",
    sortable: false,
    width: 250,
  },
  {
    field: "valorRestante",
    headerName: "Valor restante",
    type: "number",
    sortable: false,
    width: 250,
  },
  {
    field: "acoes",
    headerName: "Ações",
    description: "Editar e apagar registros",
    sortable: false,
    width: 100,
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

const rows = [
  {
    id: 1,
    nome: "Exemplo saldo 1",
    descricao: "Exemplo descrição 1",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 2,
    nome: "Exemplo saldo 2",
    descricao: "Exemplo descrição 2",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 3,
    nome: "Exemplo saldo 3",
    descricao: "Exemplo descrição 3",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 4,
    nome: "Exemplo saldo 4",
    descricao: "Exemplo descrição 4",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 5,
    nome: "Exemplo saldo 5",
    descricao: "Exemplo descrição 5",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 6,
    nome: "Exemplo saldo 6",
    descricao: "Exemplo descrição 6",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 7,
    nome: "Exemplo saldo 7",
    descricao: "Exemplo descrição 7",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 8,
    nome: "Exemplo saldo 8",
    descricao: "Exemplo descrição 8",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 9,
    nome: "Exemplo saldo 9",
    descricao: "Exemplo descrição 9",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
  {
    id: 10,
    nome: "Exemplo saldo 10",
    descricao: "Exemplo descrição 10",
    valorInicial: 100,
    valorUtilizado: 50,
    valorRestante: 50,
  },
];

const Saldos = () => {
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
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
      </Box>
    </>
  );
};

export default Saldos;
