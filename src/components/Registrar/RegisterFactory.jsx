import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Style from "./Register.module.css";
import { getCompany } from "../../Redux/action";
import Alert from "@mui/material/Alert";

///MATERIAL UI
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
/// empresas hardcoded
import { inputValueCompany } from "../functions";
import { registerCompany } from "../axiosFunctions";
import { auth } from "../Auth/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const RegisterFactory = () => {
  const [submit, setSubmit] = useState(false);
  const [submitfalse, setSubmitfalse] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [user, setUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      }
    });
  }, []);
    // ESTADOS
    const [date, setDate] = useState(null);
    const [check, setCheck] = useState(false);
    const [form, setForm] = useState({
      name: "",
      cuit: "",
      tel: "",
      adress: "",
      email: "",
      description: "",
    });
    const handleChange = (event) => {
      const property = event.target.name;
      const value = event.target.value;
      setForm({
        ...form,
        [property]: value,
      });
    };
    // REDUX
    let dispatch = useDispatch();
    // USEEFFECT
    useEffect(() => {
      dispatch(getCompany());
    }, [dispatch]);
    // FUNCIONES
  
    const handleSubmit =async(event) => {
      event.preventDefault();
      if(form.name == ""|| date == null){
        setAlertText("El campo Nombre y Fecha deben ser OBLIGATORIOS");
        setSubmitfalse(true);
        setTimeout(() => setSubmitfalse(false), 5000);
      }else{
        let data = {
          name: form.name.toUpperCase(),
          cuit: form.cuit,
          tel: form.tel,
          adress: form.adress,
          email: form.email,
          description: form.description,
          visit: date.toISOString().slice(0, 10),
          blacklist: check? "✅" : "❌",
        };
        const response  = await registerCompany(data)
        if (response.data.alert) {
          setAlertText(response.data.message);
          setSubmitfalse(true);
          setTimeout(() => setSubmitfalse(false), 5000);
        ;
      } else {
          setAlertText(response.data.message);
          setSubmit(true);
          setTimeout(() => setSubmit(false), 5000);
          setForm({ name: "", cuit: "",tel: "",adress: "",email: "",description: "" });
        }
      }
    };
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
          Registrar Empresa
        </Typography>
        {submit ? <Alert variant="filled" severity="success"><strong> {alertText}</strong></Alert> : <></>}
        {submitfalse ? <Alert variant="filled" severity="error"><strong> {alertText}</strong></Alert> : <></>}
        <Box
          color="black"
          fontFamily="Monserrat,sans.serif"
          width="100%"
          margin="0px"
        >
          <Box
            color="black"
            className={Style.codetext}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha de la Visita"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" required {...params} />
                    )}
                  />
                </LocalizationProvider>
                {inputValueCompany?.map((element) => {
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
                <FormControlLabel
                  control={
                    <Checkbox onClick={(e) => setCheck(e.target.checked)} />
                  }
                  label="Lista Negra"
                />
                <Box marginTop="20px">
                  <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
                    Enviar
                  </Button>
                </Box>
            </FormControl>
          </Box>
        </Box>
        <Box className={Style.footerdiv}>
          <footer className={Style.footer}>Power By Ignacio Peñamaria</footer>
        </Box>
      </Box>
    </>)
  );
}

export default RegisterFactory