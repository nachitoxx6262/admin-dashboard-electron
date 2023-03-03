import { Box, Typography } from "@mui/material";
import React from "react";
import LoginButton from "./LoginButton";

const Landing = () => {
  return (
    <Box
      width="50rem"
      height="50rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      >
        <Box
      width="50rem"
      height="50rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      >

        <Typography variant="h3" fontWeight="bold" color="#17742b">
          Hotel City Bell
        </Typography>
        <LoginButton></LoginButton>
      </Box>
    </Box>
  );
};

export default Landing;
