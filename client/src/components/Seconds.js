//import React, { useState, useEffect } from 'react';
import React from 'react';
import store from '../store';

import timerRegular from '../assets/harvester.gif';
import timerReset from '../assets/sandworm.png';

// Must be a function component to use hooks
const Seconds = (props) => {

  let timerImg = timerRegular;
  let imgAlt = "Spice harvester wum wum wum";
  let width = 577 * 0.75;
  let height = 295 * 0.75;
    
  const state = store.getState();
  
  if(state.secondsSinceLastAttack <= 0){
      timerImg = timerReset;
      imgAlt = "Sandworm attack!";
  }
    
  return (
      <div className="timerContainer row">
          <div className="timerImageContainer metricVizContainer">
              <img src={timerImg} width={width} height={height} alt={imgAlt} />
          </div>
      </div>
    );
};

export default Seconds;