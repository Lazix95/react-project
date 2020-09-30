import React, {Fragment} from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton/IconButton";

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from "@material-ui/icons/Menu";
import RestaurantMenu from "@material-ui/icons/RestaurantMenu";
import EuroSymbol from "@material-ui/icons/EuroSymbol";
import Assignment from "@material-ui/icons/Assignment";
import HighlightOff from "@material-ui/icons/HighlightOff";
import SettingsIcon from "@material-ui/icons/Settings";
import Home from "@material-ui/icons/Home";
import Gesture from "@material-ui/icons/Gesture";
import HowToReg from "@material-ui/icons/HowToReg";

import classes from './../NavBar.module.scss'


function ComposedListItem(props) {
   return (
      <ListItem onClick={props.onClick} button>
         <ListItemIcon>{props.children}</ListItemIcon>
         <ListItemText primary={props.text}/>
      </ListItem>
   )
}

export default function Drawer(props) {
   const [state, setState] = React.useState({left: false});
   let controlButtons;
   let menuButtons;

   const toggleDrawer = (side, open) => event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      setState({...state, [side]: open});
   };

   function goToRegister() {
      window.reactHistory.push("/register")
   }

   function goToHome() {
      window.reactHistory.push("/")
   }

   function goToMyMenu() {
      window.reactHistory.push("/my-menu")
   }

   function goToSettings() {
      window.reactHistory.push('/settings')
   }

   function goToPricing() {
      window.reactHistory.push('/upgrade-plan')
   }

   function goToLiveOrders() {
      window.reactHistory.push('/live-orders')
   }


   if (!props.auth.token) {
      controlButtons = <Fragment>
         <ComposedListItem onClick={goToRegister} text={"Register"}><Gesture/></ComposedListItem>
         <ComposedListItem onClick={props.toggleLoginDialog.bind(null, false)} text={"Log In"}><HowToReg/></ComposedListItem>
      </Fragment>;
      menuButtons = <Fragment>
         <ComposedListItem text={"About"}><InboxIcon/></ComposedListItem>
         <ComposedListItem onClick={goToPricing} text={"Pricing"}><EuroSymbol/></ComposedListItem>
      </Fragment>;
   } else if (props.auth.userType === 'admin') {
      controlButtons = <Fragment>
         <ComposedListItem onClick={goToPricing} text={"Upgrade Plan"}><EuroSymbol/></ComposedListItem>
         <ComposedListItem onClick={goToSettings} text={"Settings"}><SettingsIcon/></ComposedListItem>
         <ComposedListItem onClick={props.handleLogOut} text={"Log Out"}><HighlightOff/></ComposedListItem>
      </Fragment>;
      menuButtons = <Fragment>
         <ComposedListItem onClick={goToMyMenu} text={"My Menu"}><Assignment/></ComposedListItem>
         <ComposedListItem onClick={goToLiveOrders} text={"Live Orders"}><RestaurantMenu/></ComposedListItem>
      </Fragment>;
   } else if (props.auth.userType !== 'admin') {
      controlButtons = <Fragment>
         <ComposedListItem onClick={goToSettings()} text={"Settings"}><SettingsIcon/></ComposedListItem>
         <ComposedListItem onClick={props.handleLogOut} text={"Log Out"}><HighlightOff/></ComposedListItem>
      </Fragment>;
      menuButtons = <Fragment>
         <ComposedListItem text={"Live Orders"}><InboxIcon/></ComposedListItem>
      </Fragment>;
   }

   const sideList = side => (
      <div className={classes.Drawer} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
         <List>
            <ComposedListItem onClick={goToHome} text={"Home"}><Home/></ComposedListItem>
            {menuButtons}
         </List>
         <Divider/>
         <List>
            {controlButtons}
         </List>
      </div>
   );

   return (
      <div>
         <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit"
                     aria-label="Menu"><MenuIcon/></IconButton>
         <SwipeableDrawer open={state.left} onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}>
            {sideList('left')}
         </SwipeableDrawer>
      </div>
   );
}