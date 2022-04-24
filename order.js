
const axios = require('axios');


const CreateOrder  = async (token,data) =>{
    const url = "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc";

    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const requestOptions = {
        method: "POST",
        url,
        headers: myHeaders,
        data: data,
        redirect: "follow",
      };
  
      try {
        const response = await axios(requestOptions);
        return response.data
      } catch (err) {
          console.log(err)
          const error = { errorMessage : 'falied to create order'}
          return error

      }
}

const getDetails = async (token) => {

    const url =  'https://apiv2.shiprocket.in/v1/external/orders'
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };


      const requestOptions = {
        method: "GET",
        url,
        headers: myHeaders,
        redirect: "follow",
      };


      try{
          const response = await axios(requestOptions);
          return response.data

      }catch(err) {
        console.log(err)
        const error = { errorMessage : 'falied to create order'}
        return error
      }




}









module.exports = { CreateOrder ,getDetails }