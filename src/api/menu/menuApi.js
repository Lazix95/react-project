import axios from 'axios';

const getToken = () => {
   return {headers:{
         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }}
};

export const getMenus = (restorantID) => {
  return axios.get(`/categories/`, getToken())
      .then(res => {
         return res
      })
      .catch(err => {
         console.log(err)
      })
};

export const addNewCategoryApi = (newCategoryName) => {
   return axios.post('category',{name: newCategoryName}, getToken())
};

export const addProduct = (product) => {
   let axiosCrossDomain = axios;
   delete axiosCrossDomain.defaults.headers;
   return axiosCrossDomain.post('product', product, getToken())
};

export const updateCategory = (id, name) => {
   return axios.put(`category/${id}`, {name}, getToken())
};

export const updateProduct = (product) => {
   return axios.put(`product`, product, getToken())
};

export const deleteCategory = (id) => {
  return axios.delete(`category/${id}`, getToken())
};

export const  deleteProduct = (id) => {
   return axios.delete(`product/${id}`, getToken())
};
