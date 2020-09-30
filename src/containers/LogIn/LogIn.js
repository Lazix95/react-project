import React, {Component, Fragment} from "react";
import ComposedTextField from "../../components/Widgets/ComposedTextField/ComposedTextField";
import LinearProgress from "../../components/Widgets/LinearProgress/LinearProgress";
import {logIn} from './../../actions/authActions'

import Button from "@material-ui/core/Button/Button";
import {connect} from "react-redux";
import {userLogin} from './../../api/user/userApi'

import styles from './Login.module.scss'


class LogIn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: null,
         password: null,
         showPassword: false,
         loading: false
      }
   }

   styles = {
      loginBtn: {
         marginTop: "30px",
         marginBottom: "20px"
      }
   };

   closeModal = () => {
      if (this.props.onClose) {
         this.props.onClose()
      }
   };


   handleLogin = () => {
      const {email, password} = this.state;
      this.setState({loading: true});
      userLogin({email,password})
         .then(res => {
            console.log(res);
            this.setState({loading: false});
            this.props.logIn({
               token: res.token,
               expires: res.expires,
               staff:res.staff,
               restaurant_id: res.userData.restaurant_id,
               restaurant_name: res.userData.restaurantName
            });
            this.props.history.push('/');
            this.closeModal()
         })
         .catch(err => {
            this.setState({loading: false});
            this.setState({error: true});
         })
   };

   onChange = (e) => this.setState({[e.target.name]: e.target.value});

   render() {
      return (
         <Fragment>
            <LinearProgress loading={this.state.loading}/>
            <div className={styles.container}>
               <h3 style={{textAlign: 'center'}}>Login</h3>
               <ComposedTextField id={'loginEmail'} error={this.state.error} placeholder={"E-mail"} icon={"mail"} name={"email"} type={"email"} onChange={this.onChange}/>
               <ComposedTextField id={'loginPassword'} error={this.state.error} type="password" name="password" icon={"star"} placeholder={"Password"} onChange={this.onChange}/>
               <Button variant="outlined" disabled={this.state.loading} color={'primary'} style={this.styles.loginBtn} onClick={this.handleLogin}>Log In</Button>
            </div>
         </Fragment>
      )
   }
}

const mapDispatchToProps = {logIn};
const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);