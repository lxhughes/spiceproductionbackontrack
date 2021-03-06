import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import data from './assets/data.json';

const initialState = data.initialstate;

function counterReducer(state = initialState, action) {
    
  switch (action.type) {
      case 'dayPassed/attack': return {
          ...state,
          applicationTimer: state.applicationTimer + 1,
          secondsSinceLastAttack: 0,
          harvesters: Math.max(state.safeHarvesters, state.harvesters - 1)
      };
      case 'dayPassed/harvest': return {
          ...state,
          applicationTimer: state.applicationTimer + 1,
          secondsSinceLastAttack: state.secondsSinceLastAttack + 1,
          spiceBank: state.spiceBank + (state.harvesters * 10)
      };
      case 'sell/bank': return {
          ...state,
          spiceSold: state.spiceSold + state.spiceBank,
          profit: state.profit + (state.spiceBank * 1000),
          profitDataset: [...state.profitDataset, { "name": state.applicationTimer, "value": state.profit }],
          spiceBank: 0
      };
      case 'buy/harvester': return {
          ...state,
          harvesters: state.harvesters + 1,
          profit: state.profit - 100000
      };
      case 'buy/armor': return {
          ...state,
         safeHarvesters: state.safeHarvesters + 1,
         profit: state.profit - 200000
      };
      case 'endGame/youWin': return {
          ...state,
          youWin: true
      };
      case 'endGame/youLose': return {
         ...state,
         youLose: true
      };
      case 'restartGame': return initialState;
      default:
        return state
  }
}


export default configureStore({
  reducer: counterReducer,
  middleware: [thunk],
})