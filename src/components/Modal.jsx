import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const Modal = ({ open, onConfirm, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
      >
        <DeleteIcon color="red" />
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ color: "black", fontSize: "1rem", lineHeight: "24px" }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onClose} color="blue">
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color="red"
          sx={{ color: "white" }}
          autoFocus
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
