import React, {Component} from 'react';

import styles from './Register.module.scss'
import ComposedTextFiled from "../../components/Widgets/ComposedTextField/ComposedTextField";
import ComposedSelect from "../../components/Widgets/ComposedSelect/ComposedSelect";
import Btn from '@material-ui/core/Button'
import {userRegister} from './../../api/user/userApi'
import {validateEmail, validatePassword} from './../../util/formValidations'
import LinearProgress from "../../components/Widgets/LinearProgress/LinearProgress";

class Register extends Component {
   constructor(props) {
      super(props);
      this.state = {
         full_name: null,
         restaurant_name: null,
         email: null,
         pricingPackage: null,
         password: null,
         errors: null,
         loading:false
      };
   }

   suggestions = [
      {value: 1, label: "Number Of QR Codes: 1-20       |   Price: 60 EUR"},
      {value: 2, label: "Number Of QR Codes: 20-50      |   Price: 130 EUR"},
      {value: 3, label: "Number Of QR Codes: 50-200     |   Price: 400 EUR"},
      {value: 4, label: "Number Of QR Codes: 200-500    |   Price: 750 EUR"},
      {value: 5, label: "Number Of QR Codes: 500-1000   |   Price: 1000 EUR"},
      {value: 6, label: "Number Of QR Codes: 1000 +     |   Price: CALL"},

   ];

   toggleUserRegister = () => {
      let {full_name, restaurant_name,email, password, confirmPassword, pricingPackage} = this.state;
      let errors = {};
      errors.mail = validateEmail({email});
      errors.password = validatePassword({password, confirmPassword});
      this.setState({errors: errors});
      this.setState({loading: true});
      userRegister({fullName: full_name,restaurantName: restaurant_name, email, password, password_confirmation: confirmPassword, pricingPackage})
         .then(res => {
            console.log('res',res);
            this.setState({loading: false});
            this.props.logIn({token: res.data.token, expires: res.data.expires, restaurant_id: res.data.userData.restaurant_id, restaurant_name: res.data.userData.restaurantName});
         })
         .catch(() => {
            this.setState({loading: false});
         })
   };

   onChange = (e) => this.setState({[e.target.name]: e.target.value});
   onSelectChange = (e) => {
      console.log('eee => ',e.value);
      this.setState({pricingPackage: e.value});
   };

   render() {
      return (
         <div className={styles.register}>
            <LinearProgress loading={this.state.loading}/>
            <h1 className={styles.heading}>REGISTER</h1>
            <span>Register here to create your menu, generate QR codes, and <br/> start getting orders using our application</span>
            <ComposedSelect suggestions={this.suggestions} name={'pricingPackage'} onChange={this.onSelectChange} labelText={"Package"} placeholderText={"Select Number Of Tables"}/>
            <ComposedTextFiled marginTop={"30px"} className={styles.usernameInput} type={"text"} name="full_name" placeholder={"Full Name"} onChange={this.onChange} icon={"person"}/>
            <ComposedTextFiled marginTop={"30px"} className={styles.usernameInput} type={"text"} name="restaurant_name" placeholder={"Restaurant Name"} onChange={this.onChange} icon={"restaurant"}/>
            <ComposedTextFiled marginTop={"15px"} className={styles.emailInput} type={"email"} name="email" placeholder={"E-mail"} onChange={this.onChange} icon={"mail"}/>
            <ComposedTextFiled marginTop={"15px"} className={styles.passwordInput} type="password" name="password" icon={"star"} placeholder={"Password"} onChange={this.onChange}/>
            <ComposedTextFiled marginTop={"15px"} className={styles.passwordInput} type="password" name="confirmPassword" icon={"star"} placeholder={"Confirm Password"} onChange={this.onChange}/>
            <Btn disabled={this.state.loading} onClick={this.toggleUserRegister} className={styles.registerBtn} variant="outlined"><strong>REGISTER</strong></Btn>
         </div>

      )
   }
};

export default Register;