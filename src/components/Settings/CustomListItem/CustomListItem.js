// Custom list item for QR Codes table
import React, {useState} from "react"
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/ListItem";
import PrintImageFromUrl from "../../../util/PrintImageFromUrl";
import classes from './../../../containers/Settings/Settings.module.scss'
var QRCode = require('qrcode.react');

const textFieldProps = {style:{paddingTop: '9px', paddingBottom: '9px'}};



export default function CustomListItem(props) {
   const loading = props.loading;
   const [qrCode, setQRcode] = useState({...props.qrCode});

   const onChange = (e) => {
      setQRcode({...qrCode, tableNumber: e.target.value})
   };

   const handleUpdate = () => {
      props.handleUpdate(qrCode, props.numb)
   };

   const QRCodeImage = <QRCode value={JSON.stringify(qrCode)} renderAs="svg" size={100}/>;
   return (
      <ListItem className={classes.listItem}>
         <ListItemAvatar>
            <Avatar className={classes.qrCode}>
               {QRCodeImage}
            </Avatar>
         </ListItemAvatar>
         <div className={classes.listItemBody}>
            <div className={classes.listInfo}>
               <h3 className={classes.listTitle}>QR Code </h3>
               <TextField
                  error={props.error}
                  inputProps={textFieldProps}
                  label="Table"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  name={'table'}
                  value={qrCode.tableNumber}
                  onChange={onChange}
               />
            </div>
            <div className={classes.listActions}>
               <Button className={classes.listButton} disabled={loading} onClick={handleUpdate} variant={'outlined'}>Update</Button>
               <PrintImageFromUrl buttonVariant={'outlined'} buttonClass={classes.listButton} text={JSON.stringify(qrCode)} />
            </div>
         </div>
      </ListItem>
   )
}