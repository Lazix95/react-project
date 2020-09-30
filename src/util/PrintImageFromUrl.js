import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button'
var QRCode = require('qrcode.react');

class ComponentToPrint extends React.Component {
   render() {
      return (
      <div>
         <div style={{margin: 10}}>
         <QRCode value={this.props.text || 'text'} renderAs="svg"/>
         </div>
      </div>
      );
   }
}

const PrintImageFromUrl = (props) => {
   const componentRef = useRef();
   return (
      <div>
         <ReactToPrint
            trigger={() => <Button variant={props.buttonVariant} className={props.buttonClass}>Print</Button>}
            content={() => componentRef.current}
         />
         <div style={{display: 'none'}}>
            <ComponentToPrint picStyle={props.picStyle} text={props.text} ref={componentRef} />
         </div>
      </div>
   );
};

export default PrintImageFromUrl