import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { Button, TextField, Box, FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await navigate("/client");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="50rem"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="h2"
        align="center"
        color="#1E8449"
      >
        Log In
      </Typography>
      <FormControl onSubmit={handleLogin}>
        <Box
          display="flex"
          gap="1rem"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            size="small"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          ></TextField>
          <TextField
            size="small"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          ></TextField>
          <Button variant="contained" color="success" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default LoginForm;
