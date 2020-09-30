import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import store from './../store'


export const ProtectedRoute = ({component: Component, ...rest}) => {
   const isAuth = !!store.getState().auth.token;

    return (
        <Route {...rest}  render={props => {
            if (isAuth) {
                return <Component {...props}/>
            } else {
                return <Redirect to={{
                    pathname: '/',
                    state:{
                        from:props.location
                    }
                }}/>
            }
        }}/>
    )
};