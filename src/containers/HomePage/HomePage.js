import React, {Component} from 'react';
import Slider from "../../components/Widgets/Slider/Slider";

class HomePage extends Component {
   render() {
      return (
         <div style={{textAlign: "center"}}>
            <Slider/>
            <h1>Foor Order</h1>
            <p style={{textAlign: 'justify',
               marginLeft: 40,
               marginRight: 40}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
               dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
               ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
               fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
               mollit anim id est laborum</p>
         </div>
      );
   }
}

export default HomePage;