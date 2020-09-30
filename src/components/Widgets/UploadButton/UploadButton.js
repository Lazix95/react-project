import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/DoneAll'

import classes from './UploadButton.module.scss'

export default function UploadButton(props) {
   const [file, setFile] = useState(null);
   const buttonAttrs = file ? <Done className={classes.doneIcon}/> : 'Upload';

   const onChange = (e) => {
      let file = e.target.files[0];
      setFile(file);
      props.onChange(file)
   };

   return (
      <div className={classes.container}>
         <input type={'hidden'} value={props.getFieldValue}/>
         <input
            accept="image/*"
            className={classes.input}
            name={"image"}
            id="outlined-button-file"
            type="file"
            onChange={onChange}
         />
         <label htmlFor="outlined-button-file">
            <Button component="span" className={classes.button}>
               {buttonAttrs}
            </Button>
         </label>
      </div>
   );
}
