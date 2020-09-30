import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QRCodes from "../../components/Settings/QRCodes";
import ProfilePage from "../../components/Settings/Profile";
import StaffAcc from './StaffAcc'

const AntTabs = withStyles({
   root: {
      borderBottom: '1px solid #e8e8e8',
      overflow: 'auto'
   },
   indicator: {
      backgroundColor: '#1890ff',
   },
})(Tabs);

const AntTab = withStyles(theme => ({
   root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      '&:hover': {
         color: '#40a9ff',
         opacity: 1,
      },
      '&$selected': {
         color: '#1890ff',
         fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
         color: '#40a9ff',
      },
   },
   selected: {},
}))(props => <LinkTab {...props} />);

function LinkTab(props) {
   return (
      <Tab
         component="a"
         onClick={event => {
            event.preventDefault();
         }}
         {...props}
      />
   );
}

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      textAlign: 'center',
   }
}));

export default function TabsMenu({userData, updatePricingPackage, qrCodes, updateQRcodes, updateUserData, staff, updateStaff, disabled}) {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);

   function handleChange(event, newValue) {
      setValue(newValue);
   }

   return (
      <div className={classes.root}>
         <AntTabs  variant="fullWidth" value={value} onChange={handleChange}>
            <AntTab label="QR Codes" disabled={disabled} />
            <AntTab label="Profile" disabled={disabled} />
            <AntTab label="Staff Management" disabled={disabled} />
         </AntTabs>
         {value === 0 && <QRCodes pricingPackage={userData.pricingPackage} updatePricingPackage={updatePricingPackage} qrCodes={qrCodes} updateQRcodes={updateQRcodes} />}
         {value === 1 && <ProfilePage userData={userData} updateUserData={updateUserData}/>}
         {value === 2 && <StaffAcc staff={staff} updateStaff={updateStaff}/>}
      </div>
   );
}
