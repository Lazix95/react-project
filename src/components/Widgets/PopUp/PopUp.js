//  To use Dialog pass true prop ( CmpToShow ) component that you want to show;
// PopUp tag has to have "open" boolean prop in order to show or hide.
// pass prop function through the "onClose" prop in order to close modal - set "Open" prop to false value


import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';


function PopUp(props) {
  const { onClose, CmpToShow, style, open, ...other } = props;

  function handleClose() {
    onClose(open);
  }

  return (
    <Dialog onClose={handleClose} open={open} style={style} >
      <CmpToShow onClose={handleClose} {...other}/>
    </Dialog>
  );
}

PopUp.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired
};

export default PopUp;