import axios from 'axios';
export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_COMPANYS = 'GET_COMPANYS';
///////// CLIENTESS #########################################
export const getclients = () => {
  return function (dispatch) {
    axios.get('http://localhost:3001/client').then((response) => {
      dispatch({ type: GET_CLIENTS, payload: response.data });
    });
  };
};

///////// EMPRESAS #########################################
export const getCompany = () => {
  return function (dispatch) {
    axios.get('http://localhost:3001/company').then((response) => {
      dispatch({ type: GET_COMPANYS, payload: response.data });
    });
  };
};
///////// UPDATE CLIENT #########################################
export const updateClient = (
  id,
  name,
  gender,
  dni,
  birthdate,
  tel,
  adress,
  visit,
  blacklist,
  email,
  Empresa,
  description
) => {
  axios
    .put(`http://localhost:3001/client/${id}`, {
      name,
      gender,
      dni,
      birthdate,
      tel,
      adress,
      visit,
      blacklist,
      email,
      Empresa,
      description,
    })
    .then((response) => {
      console.log(response);
    });
};
///////// DELETE CLIENT #########################################

export const deleteClient = (id) => {
  axios.delete(`http://localhost:3001/client/${id}`).then((response) => {
    console.log(response);
  });
};
///////// UPDATE COMPANY #########################################

export const updateCompany = (
  id,
  name,
  cuit,
  tel,
  adress,
  email,
  visit,
  description,
  blacklist
) => {
  axios
    .put(`http://localhost:3001/company/${id}`, {
      id,
      name,
      cuit,
      tel,
      adress,
      email,
      visit,
      description,
      blacklist,
    })
    .then((response) => {
      console.log(response);
    });
};
///////// DELETE CLIENT #########################################

export const deleteCompany = (id) => {
  try {
    axios.delete(`http://localhost:3001/company/${id}`).then((response) => {
      return response;
    });
  } catch (error) {
    console.log(error);
  }
};
