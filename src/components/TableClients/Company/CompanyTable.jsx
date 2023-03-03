import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import CompanySave from "./CompanySave";
import { getCompany } from "../../../Redux/action";
import CompanytDelete from "./CompanytDelete";
import { useSelector, useDispatch } from "react-redux";
const CompanyTable = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  let data = useSelector((state) => state.companys);
  useEffect(() => {
    dispatch(getCompany());
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
      { field: "name", headerName: "Nombre", width: 170, editable: true },
      { field: "cuit", headerName: "Cuit", width: 100, editable: true },
      { field: "tel", headerName: "Tel", width: 80, editable: true },
      { field: "adress", headerName: "Direccion", width: 170, editable: true },
      { field: "email", headerName: "Email", width: 100, editable: true },
      { field: "visit", headerName: "Visitas", width: 100, editable: true },
      {
        field: "description",
        headerName: "Descripcion",
        width: 100,
        editable: true,
      },
      {
        field: "blacklist",
        headerName: "Lista Negra",
        width: 60,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Guardar",
        type: "actions",
        renderCell: (params) => (
          <CompanySave {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => <CompanytDelete {...{ params, rowId, setRowId }} />,
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
      <Typography
        variant="h2"
        color="#1E8449"
        fontWeight="bold"
        align="center"
      >
        Administrar Empresas
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
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

export default CompanyTable;
