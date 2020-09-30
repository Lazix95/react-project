import React, {Component, Fragment} from 'react';
import classnames from 'classnames';
import OrderDetailsTable from "../../components/LiveOrders/OrderDetails";
import Paper from '@material-ui/core/Paper'
import IncomingOrders from "../../components/LiveOrders/IncomingOrders";

import classes from './LiveOrders.module.scss'
import LinearProgress from '../../components/Widgets/LinearProgress/LinearProgress';

let incomingOrdersPeper = classnames(classes.paper, classes.incomingOrdersPeper)

class LiveOrders extends Component {
   render() {
      return (
         <Fragment>
            <LinearProgress loading={this.props.loading}></LinearProgress>
            <div className={classes.LiveOrders}>
            <h1>Live Orders</h1>
            <div className={classes.tableContainer}>
               <Paper className={incomingOrdersPeper}>
                  <IncomingOrders 
                     orders={this.props.orders} 
                     selectOrder={this.props.selectOrder} 
                     updateOrders={this.props.updateOrders} 
                     newOrders={this.props.newOrders} 
                     updateNewOrders={this.props.updateNewOrders}
                     selectedOrder={this.props.selectedOrder}/>
               </Paper>
               <Paper className={classes.paper} style={{paddingBottom: '50px'}}>
                  <OrderDetailsTable order={this.props.selectedOrder}/>
               </Paper>
            </div>
         </div>
         </Fragment>
      );
   }
}

export default LiveOrders;