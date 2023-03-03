import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import ClientSave from "./ClientSave";
import { getclients } from "../../../Redux/action";
import ClientDelete from "./ClientDelete";
import { useSelector, useDispatch } from "react-redux";
import ActualizarFecha from "../ActualizarFecha";
const ClientTable = () => {
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  let data = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getclients());
  }, [dispatch]);
  useEffect(() => {}, [data]);
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 60,
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Nombre Completo",
        width: 170,
        editable: true,
      },
      { field: "Empresa", headerName: "Empresa", width: 100, editable: true },
      { field: "dni", headerName: "DNI", width: 90, editable: true },
      {
        field: "blacklist",
        headerName: "Lista Negra",
        width: 80,
        editable: true,
      },
      { field: "email", headerName: "Email", width: 170, editable: true },
      { field: "tel", headerName: "Tel", width: 100, editable: true },
      {
        field: "birthdate",
        headerName: "Fecha Nac",
        width: 100,
        editable: true,
      },
      { field: "adress", headerName: "Dirección", width: 100, editable: true },
      { field: "gender", headerName: "Genero", width: 60, editable: true },
      { field: "visit", headerName: "Visita", width: 170, editable: true },
      {
        field: "description",
        headerName: "Descripcion",
        width: 170,
        editable: true,
      },
      {
        field: "calendar",
        headerName: "Actualizar Fecha",
        type: "actions",
        width: 170,
        renderCell: (params) => (
          <ActualizarFecha {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: "actions",
        headerName: "Guardar",
        type: "actions",
        renderCell: (params) => <ClientSave {...{ params, rowId, setRowId }} />,
      },
      {
        field: "delete",
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => (
          <ClientDelete {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{
        height: "40rem",
        width: "80rem",
      }}
    >
      <Typography variant="h2" color="#1E8449" fontWeight="bold" align="center">
        Administrar Clientes
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{ backgroundColor: "#1E8449", color: "white" }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default ClientTable;
