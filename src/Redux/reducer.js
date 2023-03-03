import { GET_CLIENTS, GET_COMPANYS } from './action';

const initialState = {
  clients: [],
  companys: [],
  companysOption: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case GET_COMPANYS:
      return {
        ...state,
        companys: action.payload,
        companysOption: action.payload?.map((element) => element.name),
      };
    default:
      return {
        ...state,
      };
  }
};
export default rootReducer;
