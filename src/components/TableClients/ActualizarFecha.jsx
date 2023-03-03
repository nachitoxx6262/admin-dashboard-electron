import {useState} from 'react'
import {Box,Fab}  from "@mui/material"
import { updateDate } from '../axiosFunctions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
const ActualizarFecha = ({ params, rowId, setRowId }) => {
    const [success, setSuccess] = useState(false);
    let {id} = params.row
    const handleClick = async()=>{
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();
        let fullfecha = `${anio}-${mes}-${dia}`
        console.log(fullfecha)
        const date = await updateDate(fullfecha,id)
        if(date.data.message == "ok"){
            setSuccess(true)
        }
        console.log(date.data.message)

    }
  return (
    <Box>
        {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor:" #1E8449",
            "&:hover": { bgcolor: "#1E8449" },
          }}
        >
          <CheckIcon />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={handleClick}
        >
         <CalendarMonthIcon/>
        </Fab>
      )}
    </Box>
  )
}

export default ActualizarFecha