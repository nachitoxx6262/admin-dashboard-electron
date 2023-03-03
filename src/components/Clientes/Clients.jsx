import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import ClientTable from "../TableClients/Clientes/ClientTable";
import CompanyTable from "../TableClients/Company/CompanyTable";
import NavBar from "../NavBar/NavBar";
import { auth } from "../Auth/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const Clients = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      }
    });
  }, []);
  return (
    user && (
      <>
        <Box display="flex">
          <NavBar></NavBar>
        </Box>
        <Box paddingTop="4rem">
          <Box>
            <Box display="flex" alignItems="center" gap="2rem" flexDirection="column" justifyContent="center">
              <ClientTable></ClientTable>
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" marginTop="3rem">
              <CompanyTable></CompanyTable>
            </Box>
          </Box>
        </Box>
      </>
    )
  );
};
export default Clients;
