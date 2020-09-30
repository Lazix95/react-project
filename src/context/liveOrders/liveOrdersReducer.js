import {
  GET_ORDERS,
  SET_NEW_ORDERS,
  SET_ORDERS_LOADING,
  SET_SELECTED_ORDER
} from './../types'

export default (state, action) => {
  switch(action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: action.payload
      }
    case SET_NEW_ORDERS: 
    return {
      ...state,
      newOrders: action.payload
    }
    case SET_ORDERS_LOADING:
      return {
        ...state,
        orderLoading: action.payload
      }
    default:
      return state;
  }
}