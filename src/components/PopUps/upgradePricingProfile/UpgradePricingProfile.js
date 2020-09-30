import React, { useState } from 'react'
import { Paper, Button, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import classes from './../../../containers/Settings/Settings.module.scss'
import {patchQRcodes} from './../../../api/user/userApi'
import LinearProgress from '../../Widgets/LinearProgress/LinearProgress';


const suggestions = [
  {value: 1, label: "Number Of QR Codes: 1-20       |   Price: 60 EUR"},
  {value: 2, label: "Number Of QR Codes: 20-50      |   Price: 130 EUR"},
  {value: 3, label: "Number Of QR Codes: 50-200     |   Price: 400 EUR"},
  {value: 4, label: "Number Of QR Codes: 200-500    |   Price: 750 EUR"},
  {value: 5, label: "Number Of QR Codes: 500-1000   |   Price: 1000 EUR"},
  {value: 6, label: "Number Of QR Codes: 1000 +     |   Price: CALL"},

];

const UpgradePricingProfile = (props) => {
  const [pricingPackage, setPricingPackage] = useState(props.pricingPackage)
  const [loading, setLoading] = useState(false)

  const onSelectChange = (e) => {
    console.log(e.target.value)
    setPricingPackage(e.target.value)
 };

  const onUpdate = () => {
    setLoading(true)
    patchQRcodes(pricingPackage)
    .then(res => {
      props.updatePricingPackage(pricingPackage)
      props.updateQRcodes(res.data.qrCodes)
      setLoading(false)
      props.onClose()
    })
    .catch(err => {
      setLoading(false)
    })
  }

    return (
    <Paper className={classes.pricingProfilePopUp}>
      <LinearProgress loading={loading}/>
      <h3>Select Your New Pricing Plan</h3>
      <RadioGroup className={classes.formControl} aria-label="PricingPlan" name={"pricingPlan"} id="adwd" value={pricingPackage.toString()} onChange={onSelectChange}>
          {suggestions.map((elem, i) => <FormControlLabel key={i} className={classes.radioButton} value={elem.value.toString()} control={<Radio/>} label={elem.label}/>)}
      </RadioGroup>
      <Button disabled={loading} variant="outlined" onClick={onUpdate} className={classes.button}>Upgrade Plan</Button>

    </Paper>
    )
};


export default UpgradePricingProfile;