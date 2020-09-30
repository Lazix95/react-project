import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import classes from '../../containers/LiveOrders/LiveOrders.module.scss'

export default function OrderDetailsTable(props) {
   const rows = props.order.products || [];

   function getTotalPrice() {
      let price = 0;
      rows.forEach(elem => price += elem.qty * elem.product.price)
      return price
   }

   return (
      <div className={classes.OrderDetailsContainer}>
         <Table className={classes.OrderDetails}>
            <TableHead>
               <TableRow>
                  <TableCell className={classes.tableCell} >Name</TableCell>
                  <TableCell className={classes.tableCell} align="center">Categories</TableCell>
                  <TableCell className={classes.tableCell} align="center">Qty</TableCell>
                  <TableCell className={classes.tableCell} align="center">Price ($)</TableCell>
                  <TableCell className={classes.tableCell} align="center">Total ($)</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {rows.map((row, i) => (
                  <TableRow key={i}>
                     <TableCell className={classes.tableCell} component="th" scope="row">{row.product.name}</TableCell>
                     <TableCell className={classes.tableCell} align="center">{row.product.category.name}</TableCell>
                     <TableCell className={classes.tableCell} align="center">{row.qty}</TableCell>
                     <TableCell className={classes.tableCell} align="center">{row.product.price}</TableCell>
                     <TableCell className={classes.tableCell} align="center">{row.qty * row.product.price}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <div className={classes.totalPrice}>
            <span>Total Price: </span>
            <span>{getTotalPrice() || 0} $</span>
         </div>
      </div>
   );
}