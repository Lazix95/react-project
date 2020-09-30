import React, {useState}from 'react';
import ExpansionPanelRoot from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CategoryMenu from "../../MyMenu/CategoryMenu/CategoryMenu";

import './ExpansionPanel.Module.scss'

export default function ExpansionPanel(props) {
   const {CmpToShow, ...others} = props;
   const [expName, setExpName] = useState(others.tableData.catalogName);
   const [expState, setExpState] = useState(false);
   const onChange = (event,expanded) => {
      if(expanded) {
         setExpName(sessionStorage.getItem('restaurant_name'))
      } else {
         setExpName(others.tableData.catalogName)
      }
      setExpState(expanded);
   };

   return (
      <div className={"ExpansionPanel"}>
         <ExpansionPanelRoot onChange={onChange}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
               <div className={'heading'}>
                  <Typography><b>{expName}</b></Typography>
                  <CategoryMenu {...props.categoryMenu} expState={expState} menu={props.tableData}/>
               </div>
            </ExpansionPanelSummary>
               <CmpToShow {...others}/>
         </ExpansionPanelRoot>
      </div>
   );
}