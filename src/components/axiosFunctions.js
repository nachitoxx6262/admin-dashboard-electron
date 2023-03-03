import axios from "axios";
export const registerFamily = async(data)=>{
     let response = await axios({
        url: "http://localhost:3001/client",
        method: "POST",
        data: data,
      });
      return response
}

export const registerCompany = async(data)=>{
    let response = await axios({
        url: "http://localhost:3001/company",
        method: "POST",
        data: data,
      });
      return response
}
export const updateDate = async(fullfecha,id)=>{
  let response = await axios({
    url: `http://localhost:3001/client/date/${id}`,
    method: "PUT",
    data: {date:fullfecha},
  });
  return response
}