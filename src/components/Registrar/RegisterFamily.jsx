import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../Redux/action";
import { Link } from "react-router-dom";
import { data_Dni, data_DniI, filtroDni } from "../functions";
import Style from "./Register.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {Box,Typography,Button,Checkbox,FormControlLabel,TextField,FormControl,Autocomplete,Alert} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { registerFamily } from "../axiosFunctions";
import { auth } from "../Auth/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const RegisterFamily = () => {
  const [user, setUser] = useState(false);
  const [date, setDate] = useState(null);
  const [check, setCheck] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submitfalse, setSubmitfalse] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [form, setForm] = useState({datos: "",tel: "",adress: "",email: "",description: "",});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      }
    });
  }, []);
  let dispatch = useDispatch();
  let companyData = useSelector((state) => state.companysOption);
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.datos == "" || date == null) {
      setAlertText("El campo Datos y Visitas deben ser OBLIGATORIOS");
      setSubmitfalse(true);
      setTimeout(() => setSubmitfalse(false), 5000);
    } else {
      let datospersonales = filtroDni(form.datos);
      if (datospersonales.length < 10) {
        var data = data_Dni(datospersonales,form,date,check,empresa)
        console.log(data)
      }
      if (datospersonales.length > 11) {
        var data = data_DniI(datospersonales,form,date,check,empresa)
        console.log(data)

      }
      const response = await registerFamily(data);
      if (response.data.alert) {
        setAlertText(response.data.message);
        setSubmitfalse(true);
        setTimeout(() => setSubmitfalse(false), 5000);
      ;
    } else {
        setAlertText(response.data.message);
        setSubmit(true);
        setTimeout(() => setSubmit(false), 5000);
        setForm({
          datos: "",
          tel: "",
          adress: "",
          email: "",
          visit: "",
          description: ""})
      }

    }
  };
  let caracteristicas = [
    { name: "Telefono: ", valor: "tel", type: "number" },
    { name: "Dirección: ", valor: "adress", type: "text" },
    { name: "Correo Electronico: ", valor: "email", type: "email" },
  ];
  return (
    user && (
    <>
      <Box padding="2rem" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box display="flex" marginBottom="14px">
          <Link to="/client" style={{textDecoration:"none"}}>
            <Button variant="contained" color="success">
              <i class="fa-solid fa-reply-all"></i>Volver a Inicio
            </Button>
          </Link>
        </Box>
        <Typography
          variant="h3"
          fontFamily="Monserrat,sans.serif"
          fontWeight="bold"
          color="#1E8449"
        >
          CheckIn Cliente
        </Typography>
        {submit ? <Alert variant="filled" severity="success"><strong> {alertText}</strong></Alert> : <></>}
        {submitfalse ? <Alert variant="filled" severity="error"><strong>{alertText}</strong></Alert> : <></>}
        <Box
          color="black"
          className={Style.codetext}
          component="form"
          noValidate
          autoComplete="off"
        >
          <FormControl
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Autocomplete
              disablePortal
              required
              value={empresa}
        onChange={(event, newValue) => {
          setEmpresa(newValue);
        }}
              id="combo-box-demo"
              options={companyData}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  label="Empresas"
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de la Visita"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField required {...params} />}
              />
            </LocalizationProvider>
            {caracteristicas?.map((element) => {
              var valor = element.valor;
              return (
                <TextField
                  sx={{ color: "black" }}
                  size="small"
                  label={element.name}
                  value={form[valor]}
                  name={valor}
                  type={element.type}
                  placeholder={element.valor}
                  onChange={handleChange}
                ></TextField>
              );
            })}
            <TextField
              multiline
              sx={{ color: "black" }}
              label="Descripcion"
              value={form.description}
              name="description"
              placeholder="Descripcion"
              onChange={handleChange}
            ></TextField>
            <TextField
              required
              sx={{ color: "black" }}
              size="small"
              label={"Datos Personales"}
              value={form.datos}
              name="datos"
              type="text"
              placeholder="Datos Personales"
              onChange={handleChange}
            ></TextField>

            <FormControlLabel
              control={<Checkbox onClick={(e) => setCheck(e.target.checked)} />}
              label="Lista Negra"
            />
            <Link to="/client/sindni" style={{textDecoration:"none"}}>
            <Typography variant="body1">Sin DNI</Typography>
            </Link>
            <Box marginTop="20px">
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Box>
          </FormControl>
        </Box>
      <Box className={Style.footerBox}>
        <footer className={Style.footer}>Power By Ignacio Peñamaria</footer>
      </Box>
      </Box>
    </>)
  );
};
export default RegisterFamily;
