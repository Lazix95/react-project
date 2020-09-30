import React, {Fragment, useState} from 'react';
import {NavLink} from 'react-router-dom'
import PopUp from "../Widgets/PopUp/PopUp";
import LogIn from "../../containers/LogIn/LogIn";
import Drawer from "./Drawer/Drawer"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Badge from '@material-ui/core/Badge';

import classes from './NavBar.module.scss'

const NavBar = function (props) {
   let controlButtons = null;
   let menuButtons = null;
   const [open, setOpen] = useState(false);


   const toggleLoginDialog = (status) => {
      setOpen(!status);
      props.toggleLoginModal(!status)
   };

   const handleLogOut = () => {
      props.logOut();
   };

   let liveOrdersLink = <Badge className={classes.padding} color="secondary" badgeContent={props.newOrders.length}>
                           <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/live-orders">Live Orders</NavLink>
                        </Badge>

   if (!props.auth.token) {
      controlButtons = <Fragment>
         <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/register">Register</NavLink>
         <span className={classes.NavLink} onClick={toggleLoginDialog.bind(null, false)}>Log In</span>
      </Fragment>;
      menuButtons = <Fragment>
         <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/About">About</NavLink>
         <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/upgrade-plan">Pricing</NavLink>
      </Fragment>;
   } else if (props.auth.userType === 'admin') {
      controlButtons = <Fragment>
         <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/upgrade-plan">Upgrade Plan</NavLink>
         <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/settings">Settings</NavLink>
         <span className={classes.NavLink} onClick={handleLogOut}>Log Out</span>
      </Fragment>;
      menuButtons = <Fragment>
         <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/my-menu">My Menu</NavLink>
         {liveOrdersLink}
      </Fragment>;
   } else if (props.auth.userType !== 'admin') {
      controlButtons = <Fragment>
         <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/settings">Profile</NavLink>
         <Button onClick={handleLogOut} color="inherit">Log Out</Button>
      </Fragment>;
      menuButtons = <Fragment>
         {liveOrdersLink}
      </Fragment>;
   }

   return (
      <div className={classes.NavBar}>
         <PopUp label={"log In"} CmpToShow={LogIn} open={open || props.auth.loginModalActive} history={props.history} onClose={toggleLoginDialog}/>
         <AppBar position="static" className={classes.header}>
            <Toolbar>
               <Hidden smUp>
                  <Drawer handleLogOut={handleLogOut} auth={props.auth} toggleLoginDialog={toggleLoginDialog}/>
               </Hidden>
               <Hidden xsDown>
                  <Typography variant="h6" className={classes.menu}>
                     <NavLink activeStyle={{color:'red'}} className={classes.NavLink} to="/" exact>Home</NavLink>
                     {menuButtons}
                  </Typography>
                  {controlButtons}
               </Hidden>
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default NavBar