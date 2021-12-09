import { configureStore } from '@reduxjs/toolkit'
import data from './assets/data.json';

const initialState = data.initialstate;

function counterReducer(state = initialState, action) {
    
    console.log("counter reducer "+action.type);

  switch (action.type) {
      case 'dayPassed/attack': return {
          ...state,
          secondsSinceLastAttack: 0,
          mostRecentAttackTime: action.payload,
          harvesters: Math.max(1, state.harvesters - 1)
      };
      case 'dayPassed/harvest': return {
          ...state,
          secondsSinceLastAttack: action.payload - state.mostRecentAttackTime, // Instead of incrementing, calculate based on most recent attack time and passed current time. This avoids double incrementing. This is a hack that doesn't solve the problems below. 
          profit: state.profit + (state.harvesters * 1000),
          spiceHarvested: state.spiceHarvested + (state.harvesters * 10),
          profitDataset: [...state.profitDataset, { "name": state.applicationTimer, "value": state.profit }]
      };
      case 'buy/harvester': return {
          ...state,
          harvesters: state.harvesters + 1,
          profit: state.profit - 100000
      };
      default:
        return state
  }
}


export default configureStore({
  reducer: counterReducer
})