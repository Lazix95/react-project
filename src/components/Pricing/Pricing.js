import React from 'react'
import './Pricing.scss'


const Pricing = () => {
   return (
      <div style={{textAlign: 'center'}}>
         <h1>Pricing</h1>
         <div className="pricing-table">
            <div className="pricing-item">
               <div className="pricing-title"> Plan 1</div>
               <div className="pricing-value">€60.<span className="smallText">00</span><span className="undertext"> / Month </span></div>
               <ul className="pricing-features">
                  <li><span className="keywords"> 1 - 20 </span> Tables</li>
                  <li>< span className="keywords"> 1 - 20 </span> QR Codes</li>
                  <li>< span className="keywords"> </span> Staff accounts</li>
               </ul>
               <div className="button">Upgrade</div>
            </div>
            <div className="pricing-item">
               <div className="pricing-title"> Plan 2
               </div>
               <div className="pricing-value"> €130.<span className="smallText">00</span><span className="undertext"> / Month </span></div>
               <ul className="pricing-features">
                  <li> <span className="keywords"> 20 - 50 </span> Tables</li>
                  <li><span className="keywords"> 20 - 50 </span> QR Codes</li>
                  <li><span className="keywords"> </span> Staff accounts</li>
               </ul>
               <div className="button">Upgrade</div>
            </div>
            <div className="pricing-item">
               <div className="pricing-title"> Plan 3
               </div>
               <div className="pricing-value"> €400.
                  <span className="smallText">00</span> <span className="undertext"> / Month </span></div>
               <ul className="pricing-features">
                  <li><span className="keywords"> 50 - 200 </span> Tables</li>
                  <li><span className="keywords"> 50 - 200 </span> QR Codes</li>
                  <li><span className="keywords"></span> Staff accounts</li>
               </ul>
               <div className="button">Upgrade</div>
            </div>
            <div className="pricing-item">
               <div className="pricing-title"> Plan 4</div>
               <div className="pricing-value"> €750.<span className="smallText">00</span> <span className="undertext"> / Month </span></div>
               <ul className="pricing-features">
                  <li> <span className="keywords"> 200 - 500 </span> Tables</li>
                  <li><span className="keywords"> 200 - 500 </span> QR Codes</li>
                  <li> <span className="keywords"> </span> Staff accounts</li>
                  <li><span className="keywords"> </span> 24/ 7 chat support</li>
               </ul>
               <div className="button">Upgrade</div>
            </div>
            <div className="pricing-item pricing-featured">
               <div className='selected'> Pro</div>
               <div className="pricing-title"> Plan 5</div>
               <div className="pricing-value"> €1000.<span className="smallText">90</span> <span className="undertext"> / Month </span></div>
               <ul className="pricing-features">
                  <li><span className="keywords"> 500 - 1000 </span> Tables</li>
                  <li><span className="keywords"> 500 - 1000 </span> QR Codes</li>
                  <li><span className="keywords"> </span> Staff accounts</li>
                  <li><span className="keywords"> </span> 24/ 7 chat support</li>
               </ul>
               <div className="button"> Contact us</div>
            </div>
         </div>
      </div>
   )
};

export default Pricing