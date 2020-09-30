import {Log_In, Log_Out,ToggleLoginModal} from './types'

const saveTokenToSessionStorage = (loginData) => {
   let tokenExpires = parseInt(Date.now()) + parseInt(loginData.expires) * 1000;
   sessionStorage.setItem('token',loginData.token);
   sessionStorage.setItem('expires', tokenExpires);
   if(loginData.staff) sessionStorage.setItem('staff', loginData.staff);
   sessionStorage.setItem('restaurant_id', loginData.restaurant_id);
   sessionStorage.setItem('restaurant_name', loginData.restaurant_name);
   return tokenExpires;
};

export const logIn = (data) => dispatch => {
    data.userType = data.staff ? 'staff' : 'admin';
    data.expires = data.autoLogin ? data.expires : saveTokenToSessionStorage(data);
    console.log('login action');
    dispatch({
        type: Log_In,
        payload: data
    })
};

export const logOut = () => dispatch => {
    sessionStorage.clear();
    dispatch({
        type: Log_Out,
        payload: null
    })
};

export const toggleLoginModal = (modalStatus) => dispatch => {
    dispatch({
       type: ToggleLoginModal,
       payload: modalStatus
    })
};