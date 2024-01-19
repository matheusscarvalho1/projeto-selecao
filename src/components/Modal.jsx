import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const Modal = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          color="warning"
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <DeleteIcon color="warning" />
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="inherit">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="outlined" onClick={onClose} color="normal">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            color="warning"
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Modal;
