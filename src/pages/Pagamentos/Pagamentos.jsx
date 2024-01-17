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

const rows = [
  {
    id: 1,
    primeiroNome: "Exemplo nome 1",
    descricao: "Exemplo descrição 1",
    valor: 1,
  },
  {
    id: 2,
    primeiroNome: "Exemplo nome 2",
    descricao: "Exemplo descrição 2",
    valor: 2,
  },
  {
    id: 3,
    primeiroNome: "Exemplo nome 3",
    descricao: "Exemplo descrição 3",
    valor: 3,
  },
  {
    id: 4,
    primeiroNome: "Exemplo nome 4",
    descricao: "Exemplo descrição 4",
    valor: 4,
  },
  {
    id: 5,
    primeiroNome: "Exemplo nome 5",
    descricao: "Exemplo descrição 5",
    valor: 5,
  },
  {
    id: 6,
    primeiroNome: "Exemplo nome 6",
    descricao: "Exemplo descrição 6",
    valor: 6,
  },
  {
    id: 7,
    primeiroNome: "Exemplo nome 7",
    descricao: "Exemplo descrição 7",
    valor: 7,
  },
  {
    id: 8,
    primeiroNome: "Exemplo nome 8",
    descricao: "Exemplo descrição 8",
    valor: 8,
  },
  {
    id: 9,
    primeiroNome: "Exemplo nome 9",
    descricao: "Exemplo descrição 9",
    valor: 9,
  },
  {
    id: 10,
    primeiroNome: "Exemplo nome 10",
    descricao: "Exemplo descrição 10",
    valor: 10,
  },
];

const Pagamentos = () => {
  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
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
      </Box>
    </>
  );
};

export default Pagamentos;
