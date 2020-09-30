import React, {useState} from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import CustomListItem from "./CustomListItem/CustomListItem";
import {Scrollbars} from 'react-custom-scrollbars';
import {putQRcodes} from './../../api/user/userApi'

import classes from './../../containers/Settings/Settings.module.scss'
import PopUp from '../Widgets/PopUp/PopUp';
import UpgradePricingProfile from '../PopUps/upgradePricingProfile/UpgradePricingProfile';

export default function QRCodes(props) {
   const [loading, setLoading] = useState(false);
   const [popUp, setPopUp] = useState(false)
   let qrElements = [];
   const qrCodes = [...props.qrCodes];



   const handleUpdate = (elem ,key) => {
      setLoading(true);
      putQRcodes(elem._id, {tableNumber:elem.tableNumber})
         .then(res => {
            setLoading(false);
            qrCodes[key].tableNumber = res.data.tableNumber;
            props.updateQRcodes(qrCodes)
         })
         .catch(err => {
            setLoading(false);
         })
   };

   const togglePopUp = () => {
      const state = !popUp
      setPopUp(state)
   };

   for(let i = 0; i < props.qrCodes.length; i++) {
     let elem = props.qrCodes[i];
     qrElements.push(<CustomListItem handleUpdate={handleUpdate} key={i} numb={i} error={false} loading={loading} qrCode={elem} />)
   }

   return (
      <div className={classes.QRCodes}>
         <h2>Print each QR code, and place it on each assingned table.</h2>
         <PopUp  updateQRcodes={props.updateQRcodes} 
            pricingPackage={props.pricingPackage} 
            CmpToShow={UpgradePricingProfile} 
            updatePricingPackage={props.updatePricingPackage} 
            open={popUp} onClose={togglePopUp}
            />
         <List className={classes.list}>
            <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={480} style={{width: '100%'}}>
               {qrElements}
            </Scrollbars>
         </List>
         <div className={classes.upgradePlan}>
            <p>Max number of tables {qrElements.length}</p>
            <Button className={classes.upgradeButton} variant={'outlined'} onClick={togglePopUp}>Upgrade Plan</Button>
         </div>
      </div>
   );
}