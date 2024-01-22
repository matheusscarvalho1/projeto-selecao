import StarIcon from "@mui/icons-material/Star";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Toasty = ({ open, severity, onClose, message }) => {
  // Manipulador de fechamento do Toasty
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          elevation={6}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
          icon={severity === "success" ? <StarIcon fontSize="inherit" /> : null}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toasty;
