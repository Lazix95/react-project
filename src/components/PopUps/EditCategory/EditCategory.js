import React, {useState, Fragment} from 'react'
import ComposedTextField from "../../Widgets/ComposedTextField/ComposedTextField";
import Button from "@material-ui/core/Button"
import LinearProgress from "../../Widgets/LinearProgress/LinearProgress";
import {updateCategory} from '../../../api/menu/menuApi'
import classes from './../../../containers/MyMenu/MyMenu.module.scss'

function EditCategory({selectedCategory, onEditCategory, onClose}) {

   const [name, setName] = useState(selectedCategory.catalogName);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const onChange = (e) => {
      setName(e.target.value)
   };

   const addNew = () => {
      setLoading(true);
      const id = selectedCategory._id;
      updateCategory(id, name)
         .then(res => {
            setLoading(false);
            const editedCategory = {catalogName: res.data.name, _id: res.data._id, products: res.data.products ? res.data.products : []};
            onEditCategory(editedCategory);
            onClose();
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
            <ComposedTextField error={error} value={name} icon={'category'} className={classes.textField} placeholder={"Category Name"} onChange={onChange}/>
            <Button disabled={loading} onClick={addNew} variant={"outlined"} color={"primary"}>UPDATE</Button>
         </div>
      </Fragment>
   )
}

export default EditCategory