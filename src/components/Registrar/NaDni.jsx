import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../Redux/action";
import { Link } from "react-router-dom";
import Style from "./Register.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {Box,Typography,Button,Checkbox,FormControlLabel,TextField,FormControl,Autocomplete,Alert} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { registerFamily } from "../axiosFunctions";
import { auth } from "../Auth/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const NaDni = () => {
  const [user, setUser] = useState(false);
  const [date, setDate] = useState(null);
  const [check, setCheck] = useState("");
  const [submit, setSubmit] = useState(false);
  const [submitfalse, setSubmitfalse] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [empresa, setEmpresa] = useState("FAMILIA");
  const [gender, setGender] = useState("");
  const [form, setForm] = useState({ name:"",dni:"",gender:"",birthdate:"",tel: "",adress: "",email: "",visit: "",description: ""});
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
    if (form.name == ""||gender == ""||form.dni == "" || date == null) {
      setAlertText("NOMBRE DNI Y GENERO deben ser OBLIGATORIOS");
      setSubmitfalse(true);
      setTimeout(() => setSubmitfalse(false), 5000);
    } else {
      let datos = {
        name: form.name,
        gender:gender,
        dni:form.dni,
        birthdate:form.birthdate,
        tel:form.tel,
        adress:form.adress,
        visit:date.toISOString().slice(0, 10),
        blacklist:check,
        email:form.email,
        description:form.description,
        company:empresa,

      }
      console.log(datos)
       const response = await registerFamily(datos);
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
           name:"",
           dni:"",
           gender:"",
           tel: "",
           adress: "",
           email: "",
           visit: "",
           description: ""})
       }

    }
  };
  let caracteristicas = [
    { name: "Nombre Completo: ", valor: "name", type: "text" },
    { name: "DNI: ", valor: "dni", type: "number" },
    { name: "Fecha de nacimiento: ", valor: "birthdate", type: "date" },
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
          CheckIn Cliente sin DNI
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
            <Autocomplete
              disablePortal
              required
              value={gender}
        onChange={(event, newValue) => {
          setGender(newValue);
        }}
              id="combo-box-demo"
              options={["M","F"]}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  label="Genero"
                />
              )}
            />
            <Autocomplete
              disablePortal 
              defaultValue={"FAMILIA"}
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
                  label="Empresa"
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
            <TextField
              multiline
              sx={{ color: "black" }}
              label="Descripcion"
              value={form.description}
              name="description"
              placeholder="Descripcion"
              onChange={handleChange}
            ></TextField>

            <FormControlLabel
              control={<Checkbox onClick={(e) =>e.target.checked?setCheck("✅"):setCheck("❌")} />}
              label="Lista Negra"
            />
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

export default NaDni