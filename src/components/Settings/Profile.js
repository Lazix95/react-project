import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import {putUserData} from "../../api/user/userApi";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import classes from './../../containers/Settings/Settings.module.scss'

function ProfilePage (props) {
   const [state, setState] = useState({
      edit: false,
      showPassword: false,
      showNewPassword: false
   });

   console.log('props => ',props.userData);

   const [userData, setUserData] = useState(props.userData);

   function useVariant() {
      if (state.edit) return 'outlined';
      return 'standard'
   }

   function handleEdit(state) {
      setState({...state, edit: state})
   }

   function startEdit() {
      setState({ ...state, userData: {...userData}, edit:true});
   };

   function cancelEdit() {
      handleEdit(false);
      setUserData({...state.userData});
   }

   const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleClickShowNewPassword = () => {
    setState({ ...state, showNewPassword: !state.showNewPassword });
  };

   function onChange(e) {
      const newUserData = {...userData};
      newUserData[e.target.name] = e.target.value;
      setUserData(newUserData)
   }

   function updateUserData() {
      putUserData(userData)
         .then(res => {
            handleEdit(false);
            setUserData(res.data);
            props.updateUserData(userData)
            if(res.data.restaurantName !== sessionStorage.getItem('restaurant_name')) {
               sessionStorage.setItem('restaurant_name', res.data.restaurantName)
            }
         })
         .catch(err => {
            console.log('%c result => ', 'color:red', err)
         })
   }


   return (
      <div className={classes.Profile}>
         <div>
            <h4 className={classes.title}>Public info:</h4>
            <TextField label="Restoraunt name" value={userData.restaurantName} name={'restaurantName'}
                       onChange={onChange} className={classes.textField} margin="dense" inputProps={{readOnly: !state.edit}} variant={useVariant()}/>
         </div>
         <div>
            <h4 className={classes.title}>Personal info:</h4>

            <TextField label="Name and Surname" value={userData.fullName} name={'fullName'} onChange={onChange}
                       className={classes.textField} margin="dense" inputProps={{readOnly: !state.edit}} variant={useVariant()}/>

            <TextField label="E-mail" value={userData.email} name={'email'} onChange={onChange}
                       className={classes.textField} margin="dense" inputProps={{readOnly: !state.edit}} variant={useVariant()}/>
         </div>
         <div>
            <h4 className={classes.title}>Change password:</h4>
            <TextField label="Current password" className={classes.textField} margin="dense" disabled={!state.edit}
                       variant={useVariant()} name="currentPassword" onChange={onChange} type={state.showPassword ? 'text' : 'password'}  InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}/>
            <br/>
            <TextField label="New password" className={classes.textField} margin="dense" disabled={!state.edit} 
            variant={useVariant()} name="newPassword" type={state.showNewPassword ? 'text' : 'password'} onChange={onChange} InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={handleClickShowNewPassword}
              >
                {state.showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}/>
         </div>
         {state.edit ? null : <Button onClick={startEdit} variant={'outlined'} className={classes.button}>Edit</Button>}
         {state.edit ? <Button onClick={updateUserData} variant={'outlined'} className={classes.button}>Update</Button> : null}
         {state.edit ? <Button onClick={cancelEdit} variant={'outlined'} className={classes.button}>Cancel</Button> : null}

      </div>

   )
};

export default ProfilePage