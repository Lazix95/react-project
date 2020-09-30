import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {acceptOrder, completeOrders, rejectOrder} from './../../api/orders/orders'

import classes from '../../containers/LiveOrders/LiveOrders.module.scss'

export default function IncomingOrders(props) {
   const [rows] = useState( props.orders);

   const handleAccept = (order) => {
      acceptOrder(order._id, {tableNumber: order.tableNumber})
         .then(res => {
           console.log('Order Accepted')
         })
         .catch(err => {
            console.log('Order Accept Error')
         })
   };

   const handleCompleteOrders = (order) => {
      completeOrders(order._id)
         .then(res => {
          console.log('Complete order')
      })
         .catch(err => {
            console.log('Order Error', err)
         })
   };

   const handleRejectOrder = (order) => {
      rejectOrder(order._id)
         .then(res => {
            console.log('Order Rejected')
         })
         .catch(err => {
            console.log('Order reject error')
      })
   };




   return (
      <div className={classes.IncomingOrders}>
         <Table>
            <TableBody>
               {rows.map((row, i) => (
                  <TableRow key={i} className={classes.row}>
                     <TableCell component="th" scope="row" className={classes.cell} style={props.newOrders.includes(row._id) ? {background: '#ffd70038'} : null}>
                        <p onClick={props.selectOrder.bind(null,row)} className={classes.text} style={props.selectedOrder._id === row._id ? {color: 'red'} : null}>
                           {!row.accepted ? <span>Order No {row.orderNumber} - </span> : null} {row.accepted ? <strong>Table {row.tableNumber}</strong> : <span>Table {row.tableNumber}</span>}
                        </p>
                        {!row.accepted ? (<ButtonGroup className={classes.buttonGroup} size="small" aria-label="Small outlined button group">
                           <Button color="primary" variant="contained" onClick={handleAccept.bind(null, row)}>Accept</Button>
                           <Button color="secondary"  variant="contained" onClick={handleRejectOrder.bind(null, row)}>Reject</Button>
                        </ButtonGroup>) : <Button onClick={handleCompleteOrders.bind(null,row)} className={classes.checkoutButton} variant={'outlined'} color={'primary'}>Checkout</Button>}
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}