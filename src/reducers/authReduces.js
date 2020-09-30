import {Log_In, Log_Out, ToggleLoginModal} from './../actions/types'

const initialState = {
   token: null,
   userType: null,
   expires: null,
   restaurant_name: null,
   restaurant_id: null,
   loginModalActive: false,
}

export default function (state = initialState, action) {
   let newState = {};
   switch (action.type) {
      case Log_In:
         newState = {
            ...state,
            token: action.payload.token,
            userType: action.payload.userType,
            expires: action.payload.expires,
            restaurant_name: action.payload.restaurant_name,
            restaurant_id: action.payload.restaurant_id
         };
         break;

      case Log_Out:
         console.log('loginingOut');
         newState = {
            ...state,
            token: null,
            userType: null,
            loginModalActive: true
         };
         break;
      case ToggleLoginModal :
         newState = {
            ...state,
            loginModalActive: action.payload
         };
         break;

      default:
         return state
   }
   return newState
}