import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from './store';

import Appnavbar from './components/Appnavbar';
import MetricCategories from './components/MetricCategories';

// Actions
const attack = () => ({ type: 'dayPassed/attack' });
const harvest = () => ({ type: 'dayPassed/harvest' });

// Thunks
const incrementTimer = () => (dispatch, getState) => {
    console.log("Increment Timer Thunk");
    
    var rand = (Math.random()*100).toFixed(0);
    
    if(rand < 10){ // sandworm attack
        dispatch(attack());
    }
    else{ // production phase
        dispatch(harvest());
    }
};

const recurUpdate = (secs) => (dispatch, getState) => {
    
  console.log("Update");
    
  setTimeout(() => {
      
      dispatch(incrementTimer());
      
      //recursively dispatch this thunk
      dispatch(recurUpdate());
      
  }, 1000);
}


// Must be a function component to use hooks
class App extends React.Component { 
    
    componentDidMount(){
        this.props.makeUpdate();
    }
    
    render(){
        
        console.log("app applicaiton timer: "+ this.props.applicationTimer);
        
      return (
        <div className="App">
          <header className="App-header">
            <Appnavbar />
          </header>

          <div id="main">
            <MetricCategories />
          </div>

        </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        applicationTimer: state.applicationTimer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       makeUpdate: () => dispatch(recurUpdate())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);