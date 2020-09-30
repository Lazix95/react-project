import React, { useReducer } from 'react'
import { getOrders } from './../../api/orders/orders'
import LiveOrdersContext from './liveOrdersContext'
import LiveOrdersReducer from './liveOrdersReducer'
import {
  GET_ORDERS,
  SET_NEW_ORDERS,
  SET_ORDERS_LOADING,
  SET_SELECTED_ORDER
} from './../types'

const LiveOrdersState = props => {
  const initialState = {
    orders: [],
    selectedOrder: {},
    ordersLoading: false,
    newOrders: []
  }

  const [state, dispatch] = useReducer(LiveOrdersReducer, initialState)

  const getOrdersState = () => {
    if (state.ordersLoading) return
    setOrdersLoading(true)
    getOrders()
      .then(res => {
        dispatch({
          type: GET_ORDERS,
          payload: res.data
        })
      })
      .catch(err => {
        setOrdersLoading(false)
      })
  }

  const socketOrderCreated = (order) => {
    const newOrders = [...state.orders, order];
    setNewOrder(order)
    setOrders(newOrders)
  };

  const socketOrderAccepted = ({ acceptedOrder, reqOrder, isOrderDeleted }) => {
    let newOrders = [...state.orders];
    const orderToExchange = newOrders.find(el => el._id === reqOrder._id);
    const oldAcceptedOrder = newOrders.find(el => el._id === acceptedOrder._id);
    const OldOrder = newOrders.indexOf(orderToExchange);

    if (oldAcceptedOrder && isOrderDeleted) {
      let index = newOrders.indexOf(oldAcceptedOrder)
      if (index > 0) newOrders[index] = acceptedOrder
      newOrders.splice(OldOrder, 1)
    } else {
      newOrders.splice(OldOrder, 1)
      newOrders.unshift(acceptedOrder)
    }
    setOrders(newOrders)
    selectOrder(acceptedOrder)
    updateNewOrders(reqOrder)
  };

  const socketOrderFinished = (order) => {
    const newOrders = [...state.orders];
    const orderToDelete = newOrders.find(el => el._id === order._id);
    const indexOfFinishedOrder = newOrders.indexOf(orderToDelete);
    let newSelectedOrder = state.selectedOrder;
    newOrders.splice(indexOfFinishedOrder, 1);
    if (newSelectedOrder && order && newSelectedOrder._id && newSelectedOrder._id === order._id) {
      newSelectedOrder = {}
    }
    selectOrder(newSelectedOrder)
    setOrders(newOrders)
  };

  const updateNewOrders = (order) => {
    if (state.newOrders.includes(order._id)) {
      const newOrdersNotifications = [...this.state.newOrders]
      newOrdersNotifications.splice(newOrdersNotifications.indexOf(order._id), 1)
      setNewOrders(newOrdersNotifications)
    }
  };

  const socketOrderRejected = (order) => {
    const newOrders = [...this.state.orders];
    const orderToDelete = newOrders.find(el => el._id === order._id);
    const indexOfFinishedOrder = newOrders.indexOf(orderToDelete);
    newOrders.splice(indexOfFinishedOrder, 1);
    setOrders(newOrders)
    updateNewOrders(order)
  };

  const setOrders = (orders) => dispatch({ type: GET_ORDERS, payload: orders })

  const selectOrder = (order) => dispatch({ type: SET_SELECTED_ORDER, payload: order })

  const setNewOrder = (order) => dispatch({ type: SET_NEW_ORDERS, payload: [...state.newOrders, order.id] })

  const setNewOrders = (orders) => dispatch({ type: SET_NEW_ORDERS, payload: orders })

  const setOrdersLoading = (status) => dispatch({ type: SET_ORDERS_LOADING, payload: status })


  return <LiveOrdersContext.Provider
    value={{
      orders: state.orders,
      selectedOrder: state.selectedOrder,
      ordersLoading: state.ordersLoading,
      newOrders: state.newOrders,
      getOrders: getOrdersState,
      selectOrder: selectOrder,
      setNewOrder: setNewOrder,
      // socketOrderCreated: socketOrderCreated,
      // socketOrderFinished: socketOrderFinished,
      // socketOrderAccepted: socketOrderAccepted,
      // socketOrderRejected: socketOrderRejected
    }}
  >
    {props.children}
  </LiveOrdersContext.Provider>
}

export default LiveOrdersState