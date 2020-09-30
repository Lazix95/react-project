import React, {Component, Fragment} from 'react';
import TabsMenu from "../../components/Settings/TabsMenu";
import {getUserData, getQRcodes, getStaff} from './../../api/user/userApi'
import LinearProgress from "../../components/Widgets/LinearProgress/LinearProgress";
import ProfilePage from "../../components/Settings/Profile";

class Settings extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: {},
         loading: false,
         qrCodes: [],
         staff: []
      }
   }

   componentWillMount() {
      this.setState({loading: true});
      getUserData()
         .then(res => {
            console.log('User Data => ', res.data);
            this.setState({userData: res.data})
            this.setState({loading: false});
         })
         .catch(err => {
            this.setState({loading: false});
         });

      if(!sessionStorage.getItem('staff')){
         getQRcodes()
            .then(res => {
               this.setState({qrCodes: res.data})
            })
            .catch(err => {
               console.log('err => ', err)
            });

         getStaff()
            .then(res => {
               this.setState({staff: res.data})
            })
            .catch(err => {
               console.log('err => ', err)
            });
      }
   }

   updateUserData = (userData) => {
      this.setState({userData: userData})
   };

   updateQRcodes = (qrCodes) => {
      this.setState({qrCodes: qrCodes})
   };

   updateStaff = (staff) => {
      this.setState({staff: staff})
   };

   updatePricingPackage = (pricingPackage) => {
      const newUserData = {...this.state.userData}
      newUserData.pricingPackage = pricingPackage
      this.setState({userData: newUserData})
   }

   render() {
      const tabs = <TabsMenu disabled={this.state.loading} 
                     userData={this.state.userData} 
                     qrCodes={this.state.qrCodes}
                     updatePricingPackage={this.updatePricingPackage}
                     updateUserData={this.updateUserData} 
                     updateStaff={this.updateStaff} 
                     updateQRcodes={this.updateQRcodes}
                     staff={this.state.staff}/>;
      const profilePage = <ProfilePage userData={this.state.userData} updateUserData={this.updateUserData}/>;
      const componentToShow = sessionStorage.getItem('staff') ? profilePage : tabs;
      return (
         <Fragment>
            <LinearProgress loading={this.state.loading}/>
            {this.state.loading ? null : componentToShow}
         </Fragment>
      );
   }
}

export default Settings;