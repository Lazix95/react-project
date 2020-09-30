import axios from 'axios'

const getToken = () => {
   return {headers:{
         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }}
};

export const userRegister = (dataToSend) => {
   return axios.post('auth/signup', dataToSend)
      .then(res => {
         console.log("res => ", res);
         return res
      })
};

export const staffRegister = (dataToSend) => {
   return axios.post('register', dataToSend, getToken())
};

export const userLogin = (dataToSend) => {
   return axios.post('auth/login', dataToSend)
      .then(res => {
         return res.data
      })
};

export const getUserData = () => {
   return axios.get('user', getToken())
      .then((res) => {
         console.log(res);
         return res
      })
};

export const putUserData = (dataToSend) => {
   return axios.put('user', dataToSend, getToken())
};

export const getQRcodes = () => {
   return axios.get('qrcodes', getToken())
};

export const putQRcodes = (id,dataToSend) => {
   return axios.put('qrcodes/'+id, dataToSend, getToken())
};

export const patchQRcodes = (pricingPlan) => {
   return axios.patch('qrcodes', {pricingPlan: pricingPlan}, getToken())
}

export const getStaff = () => {
   return axios.get('staff', getToken())
};

export const postStaff =(dataToSend) => {
   return axios.post('staff',dataToSend, getToken())
};

export const putStaff = (id,dataToSend) => {
   return axios.put('staff/'+id, dataToSend, getToken())
};

export const deleteStaff = (id) => {
   return axios.delete('staff/'+id, getToken())
};
