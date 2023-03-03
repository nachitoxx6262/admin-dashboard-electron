import React from "react";
import {auth} from  "./firebase/firebase.config"
import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom"
 const LogOutButton = () => {
    const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await auth.signOut()
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
};

export default LogOutButton;