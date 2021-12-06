//import React, { useState, useEffect } from 'react';
import React from 'react';
import store from '../store';

import timerRegular from '../assets/harvester.gif';
import timerReset from '../assets/sandworm.png';

// Must be a function component to use hooks
const Seconds = (props) => {

  let state = store.getState();
  let count = state.secondsSinceLastAttack;
    
  let units = "seconds";
  if(count >= 60) units = "minutes";
  if(count >= 3600) units = "hours";

  let timerImg = timerRegular;
  let imgAlt = "Spice harvester wum wum wum";
  let width = 577 * 0.5;
  let height = 295 * 0.5;
  
  if(count === 0){
      timerImg = timerReset;
      imgAlt = "Sandworm attack!";
  }
    
  return (
      <div className="timerContainer row">
          <div className="numberContainer col-sm-3">
            <div className="numberAndUnit">
                <div className="number">{fmtMSS(count)}</div>
                <div className="units">{units}</div>
            </div>
          </div>
          <div className="timerImageContainer metricVizContainer col-sm-9">
              <img src={timerImg} width={width} height={height} alt={imgAlt} />
          </div>
      </div>
    );
};

export default Seconds;


// Format seconds as MM:SS
function fmtMSS(s){
    return(s-(s%=60))/60+(9<s?':':':0')+s;
}
