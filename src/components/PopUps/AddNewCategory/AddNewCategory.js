import React, {useState, Fragment} from 'react'
import ComposedTextField from "../../Widgets/ComposedTextField/ComposedTextField";
import Button from "@material-ui/core/Button"
import LinearProgress from "../../Widgets/LinearProgress/LinearProgress";
import {addNewCategoryApi} from '../../../api/menu/menuApi'
import classes from './../../../containers/MyMenu/MyMenu.module.scss'

function AddNewCategory(props) {

   const [newCategoryName, setNewCategoryName] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const onChange = (e) => {
      setNewCategoryName(e.target.value)
   };

   const addNew = () => {
      setLoading(true);
      addNewCategoryApi(newCategoryName)
         .then(res => {
            setLoading(false);
            console.log(res);
           props.onAddNewCategory(res.data);
           props.onClose();
         })
         .catch(err => {
            setLoading(false);
            setError(true);
         })
   };

   return (
      <Fragment>
         <LinearProgress loading={loading}/>
         <div className={classes.AddNewCategory}>
            <h1>Add New Category</h1>
            <ComposedTextField error={error} icon={'category'} className={classes.textField} placeholder={"New Category"} onChange={onChange}/>
            <Button disabled={loading} onClick={addNew} variant={"outlined"} color={"primary"}>ADD</Button>
         </div>
      </Fragment>
   )
}

export default AddNewCategory