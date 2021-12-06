import { configureStore } from '@reduxjs/toolkit'
import data from './assets/data.json';

const initialState = data.initialstate;

function counterReducer(state = initialState, action) {

  switch (action.type) {
  case 'applicationTimer/increment': 
      return { ...state, applicationTimer: state.applicationTimer + 1 }   
    case 'secondsSinceLastAttack/increment':
       return { ...state, secondsSinceLastAttack: state.secondsSinceLastAttack + 1 }   
    case 'secondsSinceLastAttack/reset':
       return { ...state, secondsSinceLastAttack: 0 }  
    case 'sandwormAttacks/increment':
      return { ...state, sandwormAttacks: state.sandwormAttacks + 1 }
    case 'harvesters/decrement':
      return { ...state, harvesters: Math.max(1, state.harvesters - 1)}
    case 'harvesters/increment':
      return { ...state, harvesters: state.harvesters + 1 }      
    case 'spiceHarvested/increment':
      return { ...state, spiceHarvested: state.spiceHarvested + (state.harvesters * 10) }
    case 'profit/increment': 
      return { ...state, profit: state.profit + (state.harvesters * 10 * 100) }
    case 'profit/buyFrom':
      return { ...state, profit: state.profit - 100000 }          
    default:
      return state
  }
}


export default configureStore({
  reducer: counterReducer
})