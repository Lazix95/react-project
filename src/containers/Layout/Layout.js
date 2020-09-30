import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import io from "socket.io-client";
import baseUrl from "../../config/config";
import {getOrders} from "../../api/orders/orders";
import {logOut, logIn, toggleLoginModal} from './../../actions/authActions'

import NavBar from "../../components/NavBar/NavBar";
import {ProtectedRoute} from "../../hoc/ProtectedRoute";
import Pricing from "../../components/Pricing/Pricing";
import MyMenu from "../MyMenu/MyMenu";
import HomePage from "../HomePage/HomePage";
import Register from "../Register/Register";
import Settings from "../Settings/Settings";
import LiveOrders from "../LiveOrders/LiveOrders";


const getFromSessionStorage = () => {
   const token = sessionStorage.getItem("token");
   const expires = sessionStorage.getItem("expires");
   const staff = sessionStorage.getItem('staff');
   const restaurant_id = sessionStorage.getItem('restaurant_id');
   const restaurant_name = sessionStorage.getItem('restaurant_name');
   return {token, expires, staff, restaurant_id, restaurant_name}
};

class Layout extends Component {
   constructor(props) {
      super(props);
      this.state = {
         orders: [],
         selectedOrder: {},
         socketConnected: false,
         productsLoading: false,
         newOrders: []
      };
   }

   componentDidMount() {
      //In order to move around the app use window.reactHistory.push('some route') anywhere
      window.reactHistory = this.props.history;
      const {token, expires, staff, restaurant_id} = getFromSessionStorage();
      const isTokenValid = parseInt(Date.now()) < parseInt(expires);
      if (token && isTokenValid) {
         this.props.logIn({token: token, expires: expires, restaurant_id, staff, autoLogin: true});
      }
   }

   componentDidUpdate(nextProps, nextState, nextContext) {
      const path = window.reactHistory.location.pathname;
      if (!nextProps.auth.token && this.props.auth.token && path !== '/') {
         window.reactHistory.push('/')
      }
      this.connectSocket();
   }

   getOrders = () => {
      if(this.productsLoading) return;
      this.setState({productsLoading: true})
      getOrders()
         .then(res => {
            this.setState({orders: res.data});
            console.log('orders => ', this.state.orders);
            this.setState({productsLoading: false})
         })
         .catch(err => {
            console.log('getOrders err =>', err);
            this.setState({productsLoading: false})
         })
   };


   connectSocket = () => {
      const {token} = getFromSessionStorage();
      if ((token || this.props.auth.token)) {
         if (this.state.socketConnected) return;
         if(!this.state.productsLoading) this.getOrders();
         this.socket = io.connect(baseUrl, {reconnection: false});
         this.socket.on('connect', () => {
            this.setState({socketConnected: true});
            this.socket.emit('room', sessionStorage.getItem('restaurant_id'));
            this.socket.on('disconnect', () => {
               this.setState({socketConnected: false});
            });
         });

         this.socket.on('orderCreated', this.socketOrderCreated);

         this.socket.on('orderFinished', this.socketOrderFinished);

         this.socket.on('orderAccepted', this.socketOrderAccepted);

         this.socket.on('orderRejected', this.socketOrderRejected)

      } else if (!this.state.socketConnected && this.socket) {
         this.socket.disconnect();
      }
   };

   socketOrderCreated = (order) => {
      const newOrders = [...this.state.orders];
      newOrders.push(order);
      this.setState({newOrders: [...this.state.newOrders, order._id]})
      this.setState({orders: newOrders});
      console.log('this.state.newOrders => ', this.state.newOrders)
   };

   socketOrderFinished = (order) => {
      const newOrders = [...this.state.orders];
      const orderToDelete = newOrders.find(el => el._id === order._id);
      const indexOfFinishedOrder = newOrders.indexOf(orderToDelete);
      const selectedOrder = this.state.selectedOrder;
      let newSelectedOrder = null;
      newOrders.splice(indexOfFinishedOrder, 1);
      if(selectedOrder && order && selectedOrder._id && selectedOrder._id === order._id) {
         newSelectedOrder = {}
      }
      this.setState({orders: newOrders, selectedOrder: newSelectedOrder});
   };

   socketOrderAccepted = ({acceptedOrder, reqOrder, isOrderDeleted}) => {
      let newOrders = [...this.state.orders];
      const orderToExchange = newOrders.find(el => el._id === reqOrder._id);
    //  const orderToDelete = newOrders.find(el => el._id === acceptedOrder._id);
      const oldAcceptedOrder = newOrders.find(el => el._id === acceptedOrder._id);
      const OldOrder = newOrders.indexOf(orderToExchange);

      if(oldAcceptedOrder && isOrderDeleted) {
         console.log('Old acc ord =>  ' ,oldAcceptedOrder)
         let index = newOrders.indexOf(oldAcceptedOrder)
         if (index > 0) newOrders[index] = acceptedOrder
         newOrders.splice(OldOrder, 1)
         console.log('index of order to change ');
      } else {
         newOrders.splice(OldOrder, 1)
         newOrders.unshift(acceptedOrder)
         console.log('orders =>  ', newOrders)
      }
      this.updateOrders(newOrders, acceptedOrder)
      this.updateNewOrders(reqOrder)
   };

   socketOrderRejected = (order) => {
      const newOrders = [...this.state.orders];
      const orderToDelete = newOrders.find(el => el._id === order._id);
      const indexOfFinishedOrder = newOrders.indexOf(orderToDelete);
      newOrders.splice(indexOfFinishedOrder, 1);
      this.setState({orders: newOrders});
      this.updateNewOrders(order)
   };

   updateOrders = (orders, selectedOrder) => {
      if(selectedOrder) this.setState({selectedOrder: selectedOrder})
      this.setState({orders: orders});
   };

   updateNewOrders = (order) => {
      if(this.state.newOrders.includes(order._id)){
         const newOrdersNotifications = [...this.state.newOrders]
         newOrdersNotifications.splice(newOrdersNotifications.indexOf(order._id), 1)
         this.setState({newOrders: newOrdersNotifications})
      }
   };

   selectOrder = (order) => {
      this.setState({selectedOrder: order})
      console.log('order => ',order)
      this.updateNewOrders(order)
   };


   render() {
      const liveOrdersCmp = <LiveOrders
      selectOrder={this.selectOrder}
       selectedOrder={this.state.selectedOrder}
        orders={this.state.orders}
      updateOrders={this.updateOrders}
       newOrders={this.state.newOrders}
        updateNewOrders={this.updateNewOrders}
         loading={this.state.productsLoading}
         />

      return (
         <div>
            <NavBar history={this.props.history} toggleLoginModal={this.props.toggleLoginModal}
                    logOut={this.props.logOut} auth={this.props.auth} newOrders={this.state.newOrders}/>
            <Route exact path={"/"} component={HomePage}/>
            <Route path={"/register"} component={() => <Register logIn={this.props.logIn}/>}/>
            <Route path={'/upgrade-plan'} component={Pricing}/>
            <ProtectedRoute path={"/my-menu"} component={() => <MyMenu restaurant_name={this.props.auth.restaurant_name}/>}/>
            <ProtectedRoute path={"/settings"} component={Settings}/>
            <ProtectedRoute path={"/live-orders"} component={() => liveOrdersCmp}
            />
         </div>
      );
   }
}

const mapDispatchToProps = {logOut, logIn, toggleLoginModal};

const mapStateToProps = state => ({
   auth: state.auth
});


const newLayout = withRouter(Layout);
export default connect(mapStateToProps, mapDispatchToProps)(newLayout);
