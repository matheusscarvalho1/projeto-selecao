import React, { useState } from "react";
//import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RegistroSaldo from "./RegistroSaldo";
import styles from "./saldos.module.css";
import { useNavigate } from "react-router-dom";

const Saldos = () => {
  // const location = useLocation();

  // const { state } = location;
  // const nome = location.state?.nome || "";
  // const valor = location.state?.valor || "";
  //console.log(location.state.nome, location.state.valor);

  const [rows, setRows] = useState([
    {
      id: 1,
      nome: /*nome,*/ "Saldo 2",
      descricao: "Descrição 1",
      valorInicial: /*valor*/ 200,
      valorUtilizado: 20,
      valorRestante: 80,
    },
    {
      id: 2,
      nome: "Saldo 2",
      descricao: "Descrição 2",
      valorInicial: 200,
      valorUtilizado: 50,
      valorRestante: 150,
    },
    // Adicione quantos objetos quiser
  ]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    alert("Editar");
  };

  const handleDelete = (id) => {
    alert("Excluir");
  };

  const handleRegister = (data) => {
    setRows((prevRows) => [...prevRows, data]);
    setShowForm(false);
    alert("Registro adicionado");
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

  const handleButton = () => {
    navigate("/saldos/add");
  };

  return (
    <>
      {rows.length === 0 ? (
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
