import axios from 'axios'
import store from './../store'
import {logOut} from './../actions/authActions'

const baseURL = 'https://foodadmintest.herokuapp.com/';
//const baseURL = 'http://localhost:8080/';
 
axios.defaults.baseURL = baseURL;

axios.defaults.headers.common = {
   "Accept": 'application/json',
   "Content-Type": "application/x-www-form-urlencoded"
};

axios.interceptors.request.use(request => {
  let expires = sessionStorage.getItem('expires');
  if(!expires) return request;
  if(request.url !== 'auth/login' && request.url !== 'auth/register' && parseInt(Date.now()) >= parseInt(expires)) {
     sessionStorage.clear();
     store.dispatch(logOut());
     return new Promise((resolve,reject) => {
        reject('Token Expired')
     })
  }
   return request
});

export default baseURL;