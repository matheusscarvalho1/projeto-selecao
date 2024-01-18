import { TextField, Button } from "@mui/material";

import styles from "./registro.module.css";
const Register = () => {
  return (
    <div className={styles.container}>
      <h1>Criar pedido</h1>
      <div className={styles.inputWrapper}>
        <div>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            className={styles.input}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Descrição"
            variant="outlined"
            className={styles.input}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            className={styles.input}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="Selecione o saldo a utilizar"
            variant="outlined"
            className={styles.input}
          />
        </div>
      </div>

      <div class={styles.btns}>
        <Button variant="outlined" color="primary">
          Cancelar
        </Button>
        <Button variant="contained">Cadastrar</Button>
      </div>
    </div>
  );
};
export default Register;
