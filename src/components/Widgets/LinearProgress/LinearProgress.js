// To activate linear progress pass bool prop "loading";

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Progress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
   root: {
      flexGrow: 1,
   },
});

 function LinearProgress({loading}) {
   const classes = useStyles();
   let margin = <div style={{padding: "2px"}}/>;
   let progress = <Progress />;
   let elemToShow = loading ? progress : margin;
   return (
      <div className={classes.root}>
         {elemToShow}
      </div>
   );
}

LinearProgress.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default LinearProgress