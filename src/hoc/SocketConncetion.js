import React, { Fragment, useState, useContext } from 'react';
import io from "socket.io-client";
import baseUrl from "../../config/config";
import LiveOrderContext from '../context/liveOrders/liveOrdersContext';

const SocketConncetion = (props) => {
  const [socketConnected, setSocketConnected] = useState(false)
  const {socketOrderAccepted, socketOrderCreated, socketOrderFinished, socketOrderRejected} = useContext(LiveOrderContext)
  let socket = null;

  const connectSocket = () => {
    const token = sessionStorage.getItem('token');
    if ((token || this.props.auth.token)) {
       if (socketConnected) return;
       socket = io.connect(baseUrl, {reconnection: false});
       socket.on('connect', () => {
          setSocketConnected(true)
          socket.emit('room', sessionStorage.getItem('restaurant_id'));
          socket.on('disconnect', () => {
            setSocketConnected(false)
          });
       });
  
       this.socket.on('orderCreated', socketOrderCreated);
  
       this.socket.on('orderFinished', socketOrderFinished);
  
       this.socket.on('orderAccepted', socketOrderAccepted);
  
       this.socket.on('orderRejected', socketOrderRejected)
  
    } else if (!this.state.socketConnected && this.socket) {
       this.socket.disconnect();
    }
  };

  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}

export default SocketConncetion