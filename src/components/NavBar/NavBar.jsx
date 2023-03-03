import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import FactoryIcon from "@mui/icons-material/Factory";
import LogOutButton from "../Auth/LogOutButton";
const NavBar = () => {
  return (

      <Box
        width="100%"
        height="5rem"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography variant="h3" fontWeight="bold" color="#17742b">Hotel City Bell</Typography>
            <Link to="/registercompany" className={styles.a}>
            <FactoryIcon /> {" "}Registrar Empresa
            </Link>
            <Link to="/clientfamily" className={styles.a}>
            <FamilyRestroomIcon />{" "}Registrar Cliente
            </Link>
            <LogOutButton></LogOutButton>
      </Box>
  );
};

export default NavBar;
