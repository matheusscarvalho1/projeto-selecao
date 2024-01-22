import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";

import useAuth from "../../state/auth";
import Toasty from "../../components/Toasty";

import styles from "./header.module.css";

const Header = () => {
  // Hooks de estado
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastySeverity, setToastySeverity] = useState("success");
  const [toastyMessage, setToastyMessage] = useState("");
  const [openToasty, setOpenToasty] = useState(false);

  // Hooks do React Router para navegação
  const navigate = useNavigate();

  // Hooks Glogal (Context API)
  const { user, setUser } = useAuth();

  // Função para lidar com a abertura/fechamento do menu
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Função para lidar com cliques nos itens do menu
  const handleMenuClick = (route) => {
    navigate(route);
    handleToggleMenu();
  };

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    if (user.logged) {
      setUser({
        logged: false,
        email: "",
      });

      setToastySeverity("success");
      setToastyMessage("Logout realizado com sucesso.");
    } else {
      setToastySeverity("error");
      setToastyMessage("Você não efetuou login.");
    }
    setOpenToasty(true);
  };

  // Função para lidar com o fechamento do Toasty
  const handleToastyClose = () => {
    setOpenToasty(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => handleToggleMenu()}
          >
            <MenuIcon className={styles.icon} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            fontFamily="alata"
            fontSize={34}
            className={styles.menuBar}
          >
            Payments
          </Typography>
          {user.logged ? (
            <div className={styles.user}>
              <Typography variant="h6">{user.email}</Typography>
              <AccountCircle fontSize="large" />
            </div>
          ) : (
            <Button color="inherit" onClick={() => handleMenuClick("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={menuOpen} onClose={() => handleToggleMenu(false)}>
        <List className={styles.toggleBar}>
          <ListItemButton
            className={styles.menuItem}
            onClick={() => handleMenuClick("/pagamentos")}
          >
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText>Pagamentos</ListItemText>
          </ListItemButton>
          <ListItemButton
            className={styles.menuItem}
            onClick={() => handleMenuClick("/saldos")}
          >
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText>Saldos</ListItemText>
          </ListItemButton>
          <ListItemButton
            className={styles.menuItem}
            onClick={() => handleLogout()}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Sair da conta</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <Toasty
        open={openToasty}
        severity={toastySeverity}
        onClose={handleToastyClose}
        message={toastyMessage}
      />
    </>
  );
};

export default Header;
