/* eslint-disable */
import React from 'react';
import MaterialTable from 'material-table';
import {AddBox, Done, Clear, DeleteOutline, Edit, SaveAlt, FilterList, FirstPage} from '@material-ui/icons';
import {LastPage, ChevronLeft, ChevronRight, Search, ArrowUpward, Remove, ViewColumn} from '@material-ui/icons';
import UploadButton from "../../Widgets/UploadButton/UploadButton";

import baseUrl from './../../../config/config'
import classes from './../../../containers/MyMenu/MyMenu.module.scss'


import {addProduct, deleteProduct, updateProduct} from './../../../api/menu/menuApi'

const tableIcons = {
   Add: AddBox,
   Check: Done,
   Clear: Clear,
   Delete: DeleteOutline,
   DetailPanel: ChevronRight,
   Edit: Edit,
   Export: SaveAlt,
   Filter: FilterList,
   FirstPage: FirstPage,
   LastPage: LastPage,
   NextPage: ChevronRight,
   PreviousPage: ChevronLeft,
   ResetSearch: Clear,
   Search: Search,
   SortArrow: ArrowUpward,
   ThirdStateCheck: Remove,
   ViewColumn: ViewColumn
};

export default function MenuTable({categoryName, tableData}) {
   const restaurant_id = sessionStorage.getItem('restaurant_id');

   const [state, setState] = React.useState({
      columns: [
         {title: 'Name', field: 'name'},
         {title: 'Price(EUR)', field: 'price', type: 'numeric'},
         {title: 'Description', field: 'description'},
         {
            title: 'Image',
            field: 'image',
            render: rowData => <img src={baseUrl+rowData.image} alt={"menuImg"} className={classes.menuIcon} />,
            editComponent: UploadButton
         },
         {title: 'Show', field: 'show', type: 'boolean'}
      ],
      data: tableData.products,
   });

   const onRowAdd = (newData) => {
      let product = {...newData, categoryId: tableData._id};
      const formData = new FormData();
      for (let key in product) {
         formData.append(key, product[key])
      }
      return addProduct(formData).then(res => {
         let newElem = res.data;
         newElem.image = newElem.image.replace("https://food-order.quantox.dev/", "");
         console.log('product => ', res);
         const data = [...state.data];
         data.push(res.data);
         setState({...state, data});
         return res
      })
         .catch(err => {
            return err
         })
   };

   const onRawUpdate = (newData, oldData) => {
      const product = {productId: oldData._id, name: newData.name, price: newData.price, description: newData.description, image: newData.image, show: newData.show};
      const formData = new FormData();
      for (let key in product) {
         formData.append(key, product[key])
      }
      return updateProduct(formData).then(res => {
         console.log('new Data => ', res);
         const data = [...state.data];
         data[data.indexOf(oldData)] = res.data;
         setState({...state, data});
         return res
      })
   };

   const onRawDelete = oldData => {
      return deleteProduct(oldData._id).then(res => {
         if (res.status === 200) {
            const data = [...state.data];
            data.splice(data.indexOf(oldData), 1);
            setState({...state, data});
         }
         return res
      })
   };


   return (
      <MaterialTable
         title={tableData.catalogName}
         columns={state.columns}
         data={state.data}
         localization={{body: {editRow: {deleteText: 'Are you sure to delete this product?'}}}}
         icons={tableIcons}
         options={{
            actionsColumnIndex: -1,
            paging: false
         }}
         editable={{
            onRowAdd: onRowAdd,
            onRowUpdate: onRawUpdate,
            onRowDelete: onRawDelete
         }}
      />
   );
}
