import React, {forwardRef, useState} from 'react';
import {postStaff, putStaff, deleteStaff} from './../../api/user/userApi'

import MaterialTable from "material-table";
import Paper from '@material-ui/core/Paper'

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
   Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
   DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
   PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
   Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
   SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const columns = [
   {title: "Full Name", field: "fullName"},
   {title: "E-mail", field: "email"}
];


export default function StaffAcc({staff, updateStaff}) {
   const [state, setState] = useState({
      columns: [...columns],
      data: [...staff]
   });

   const tableFnc = {
      onRowAdd: newData => {
         console.log(newData);
         const dataToSend = {...newData, restaurantId: sessionStorage.getItem('restaurant_id')};
         return postStaff(dataToSend)
            .then(res => {
               const data = [...state.data];
               data.push(res.data);
               setState({...state, data});
               updateStaff(state.data)
            })
      },
      onRowUpdate: (newData, oldData) => {
        return putStaff(oldData._id,newData)
            .then(res => {
               const data = [...state.data];
               data[data.indexOf(oldData)] = res.data;
               setState({...state, data});
               updateStaff(state.data)
            })
      },
      onRowDelete: oldData => {
        return deleteStaff(oldData._id)
            .then(res => {
               const data = [...state.data];
               data.splice(data.indexOf(oldData), 1);
               setState({...state, data});
               updateStaff(state.data)
            })
      },
   };

   return (

      <div style={{paddingBottom: '100px'}}>
         <Paper style={{maxWidth: '800px', margin: 'auto', paddingBottom: '50px', marginTop: "100px"}}>
            <MaterialTable
               icons={tableIcons}
               columns={state.columns}
               data={state.data}
               title="Staff Accounts"
               options={{
                  actionsColumnIndex: -1,
                  paging: false
               }}
               editable={tableFnc}
            />
         </Paper>
      </div>
   );
}

