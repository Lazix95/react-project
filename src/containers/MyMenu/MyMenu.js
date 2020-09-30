import React, {Component, Fragment} from 'react';
import MenuTable from "../../components/MyMenu/MenuTable/MenuTable";
import ExpansionPanel from "../../components/Widgets/ExpansionPanel/ExpansioPanel";
import Button from '@material-ui/core/Button';
import PopUp from "../../components/Widgets/PopUp/PopUp";
import AddNewCategory from "../../components/PopUps/AddNewCategory/AddNewCategory";
import EditCategory from "../../components/PopUps/EditCategory/EditCategory";

import {getMenus, deleteCategory} from '../../api/menu/menuApi'

import classes from './MyMenu.module.scss'
import LinearProgress from '../../components/Widgets/LinearProgress/LinearProgress';


class MyMenu extends Component {

   state = {
      addNewCategory: false,
      editCategory: false,
      selectedCategory: null,
      menuData: [],
      loading: false
   };

   componentWillMount() {
      let restaurant_id = sessionStorage.getItem('restaurant_id');
      this.setState({loading: true})
      getMenus(restaurant_id)
         .then(res => {
            var newMenuData = [];
            if (!res) return;
            res.data.forEach((category) => {
               newMenuData.push({catalogName: category.name, _id: category._id, products: category.products})
            });
            this.setState({menuData: newMenuData})
            this.setState({loading: false})
         })
         .catch(err => {
            this.setState({loading: false})
         }) 
   }

   togglePopUp = () => {
      console.log('expancsion panel ',this.props);
      this.setState({addNewCategory: !this.state.addNewCategory})
   };

   toggleEditPopUp = (category) => {
      this.setState({editCategory: !this.state.editCategory});
      if (category) this.setState({selectedCategory: category});
   };

   handleNewCategory = (newCategoryData) => {
      console.log('adawd => ', newCategoryData);
      let newMenuData = [...this.state.menuData];
      newMenuData.push({catalogName: newCategoryData.name, _id: newCategoryData._id, products: []});
      this.setState({menuData: newMenuData})
   };

   handleCategoryEdit = (editedCategory) => {
      const data = [...this.state.menuData];
      data[data.indexOf(this.state.selectedCategory)] = editedCategory;
      this.setState({menuData: []});
      this.setState({menuData: data});
   };

   categoryMenu = {
      onDelete: (category) => {
         console.log('category => ', category)
         deleteCategory(category._id)
            .then(res => {
               const data = [...this.state.menuData];
               console.log('pre delete ',data, category);
               data.splice(data.indexOf(category), 1);
               this.setState({menuData: []});
               this.setState({menuData: data});
            })
      },
      onEdit: (category) => {
         this.toggleEditPopUp(category);
      }
   };

   render() {
      let menusToShow = [];
      this.state.menuData.forEach(menu => {
         menusToShow.push(<ExpansionPanel tableData={menu} categoryMenu={this.categoryMenu} key={menusToShow.length}
                                          CmpToShow={MenuTable} restaurant_name={this.props.restaurant_name}/>);
         menusToShow.push(<br key={menusToShow.length + 'ac'}/>);
      });
      return (
         <Fragment>
            <LinearProgress loading={this.state.loading} />
            <div className={classes.MyMenu}>
            <div className={'textCenter'}>
               <h1>My Menu</h1>
            </div>
            <Button color={"primary"} onClick={this.togglePopUp} className={classes.addButton} variant={"outlined"}>Add
               New Category</Button>
            <PopUp onClose={this.togglePopUp} open={this.state.addNewCategory} onAddNewCategory={this.handleNewCategory}
                   CmpToShow={AddNewCategory}/>
            <PopUp onClose={this.toggleEditPopUp} open={this.state.editCategory}
                   selectedCategory={this.state.selectedCategory} onEditCategory={this.handleCategoryEdit}
                   CmpToShow={EditCategory}/>
            <div className={'textCenter'}>
               <div className={classes.categories}>
                  {menusToShow}
               </div>
            </div>
         </div>
         </Fragment>
      );
   }
}

export default MyMenu;