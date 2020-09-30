import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function CategoryMenu(props) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const toggle = props.expState ? 'Close' : 'Open';

   function handleClick(event) {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
   }

   function handleClose(event) {
      event.stopPropagation();
      setAnchorEl(null);
   }

   function onOpen(e) {
      setAnchorEl(null);
   }

   function onEdit(e) {
      handleClose(e);
      props.onEdit(props.menu)
   }

   function onDelete(e) {
      handleClose(e)
      props.onDelete(props.menu)
   }

   return (
      <div>
         <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Options
         </Button>
         <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            <MenuItem onClick={onOpen}>{toggle}</MenuItem>
            <MenuItem onClick={onEdit}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
         </Menu>
      </div>
   );
}