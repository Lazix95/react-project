import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Person from '@material-ui/icons/Person'
import Mail from '@material-ui/icons/MailOutline';
import AC from '@material-ui/icons/AcUnit';
import Category from '@material-ui/icons/Category';
import Restaurant from '@material-ui/icons/Restaurant'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import style from './ComposedTextField.module.scss'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '10px, 0'
    },
    formControl: {
        margin: theme.spacing(1),
        marginLeft: "0"
    },
}));

const ComposedTextField = function ({onChange,id, value, placeholder,name, icon, marginTop, type, error, ...others}) {
    const [labelWidth, setLabelWidth] = React.useState(0);
    const labelRef = React.useRef(null);
    const classes = useStyles();
   let iconCmp;
   const [showPassword, setShowPassword] = useState(false);
   let activeState = showPassword ? 'text' : type
    function handleClickShowPassword () {
        setShowPassword(!showPassword)
    }
    let endAdornment = <InputAdornment position="end">
                        <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>;

    const getEndAdornment = () => {
        if(type === "password") {
            return endAdornment
        } else {
            return null
        }
    };
   React.useEffect(() => {
        setLabelWidth(labelRef.current.offsetWidth);
   }, []);

    function handleChange(e) {
        onChange(e)
    }

    if (icon === "person") {
        iconCmp = <Person fontSize={"large"} />;
    } else if(icon === 'mail') {
        iconCmp = <Mail fontSize={"large"} />;
    } else if( icon === 'star') {
       iconCmp = <AC fontSize={"large"}/>;
    } else if (icon === 'category') {
       iconCmp = <Category fontSize={"large"}/>
    }else if (icon === 'restaurant') {
       iconCmp = <Restaurant fontSize={"large"}/>
    }

    return (
        <Fragment>
            <div className={classes.container} {...others}>
                <input name={"username"} type={"hidden"} />
                <input name={"email"} type={"hidden"} />
                <input name={"password"} type={"hidden"} />
                <input name={"confirmPassword"} type={"hidden"} />
                <Grid className={style.container} container style={{marginTop: marginTop}} alignItems={"center"} justify={"center"}>
                   <Hidden xsDown>
                      <Grid item className={style.inputIcon}>
                         {iconCmp}
                      </Grid>
                   </Hidden>
                    <Grid item>
                        <FormControl className={`${classes.formControl} ${style.formControl}`} variant="outlined" style={{width: '100%'}}>
                              <InputLabel ref={labelRef} htmlFor="component-outlined">
                                 {placeholder}
                              </InputLabel>
                            <OutlinedInput
                                className={style.outlineBorderCorrection}
                                id={id}
                                value={value}
                                onChange={handleChange}
                                labelWidth={labelWidth}
                                name={name}
                                type={activeState}
                                autoComplete='new-password'
                                endAdornment={getEndAdornment()}
                                error={error}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};

export default ComposedTextField
