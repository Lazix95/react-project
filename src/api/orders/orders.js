import axios from 'axios';

const getToken = () => {
   return {headers:{
         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }}
};

export const getOrders = () => {
  return axios.get('orders', getToken())
};

export const acceptOrder = (id,dataToSend) => {
   return axios.patch('orders/'+id, dataToSend, getToken())
};

export const completeOrders = (id) => {
   return axios.put('orders/'+id, {}, getToken())
};

export const rejectOrder = (id) => {
   return axios.delete('orders/'+id, getToken())
};