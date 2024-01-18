import * as React from "react";
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

import styles from "./header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (route) => {
    navigate(route);
    handleToggleMenu();
  };
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    user.logged
      ? setTimeout(() => {
          setUser({
            logged: false,
            email: "",
          });
          handleToggleMenu();
          navigate("/");
        }, 1500)
      : alert("Você não efetuou login.");
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
            className={styles.icon}
            onClick={() => handleToggleMenu()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className={styles.menuBar}>
            Payments
          </Typography>
          {user.logged ? (
            <div className={styles.user}>
              <Typography variant="h6">{user.email}</Typography>
              <AccountCircle />
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
    </>
  );
};

export default Header;
