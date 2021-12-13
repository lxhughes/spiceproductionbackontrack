import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import Appnavbar from './components/Appnavbar';
import MetricCategories from './components/MetricCategories';

// Actions
const attack = () => ({ type: 'dayPassed/attack' });
const harvest = () => ({ type: 'dayPassed/harvest' });
const win = () => ({ type: 'endGame/youWin' });
const lose = () => ({ type: 'endGame/youLose' });
const restart = () => ({ type: 'restartGame' });

// Thunks
const checkWin = () => (dispatch, getState) => {
    
    const state = getState();
    
    if(state.spiceHarvested >= state.spiceHarvestedGoal){
        dispatch(win());
    }
    else {
        dispatch(lose());
    }
    
}

const incrementTimer = () => (dispatch, getState) => {

    var rand = (Math.random()*100).toFixed(0);
    
    if(rand < 10){ // sandworm attack
        dispatch(attack());
    }
    else{ // production phase
        dispatch(harvest());
    }
};

const recurUpdate = (secs) => (dispatch, getState) => {
    
  const state = getState();
    
  setTimeout(() => {
      
      if(state.applicationTimer >= 365){ // Win condition
          
          dispatch(checkWin());
          
      }
      else {
      
          dispatch(incrementTimer());
      
          //recursively dispatch this thunk
          dispatch(recurUpdate());
      }
  }, 1000);
}


// Must be a function component to use hooks
class App extends React.Component { 
    
    componentDidMount(){
        this.props.makeUpdate();
    }
    
    render(){

      return (
        <div className="App">
          <header className="App-header">
            <Appnavbar />
          </header>

          <div id="main">
            <MetricCategories />
          </div>
          
          <Modal show={this.props.youWin}>
            <Modal.Title className="modalTitle modalWin">You impressed the emperor!</Modal.Title>
            <Modal.Body>Somehow, you did it. Despite constant sandworm attacks and attempts at Harkonnen betrayal, under your cunning leadership, you led the spice melange to prosperity and impressed the emperor. You will peacefully rule Arrakis for a long, long time (barring the unlikely eventuality of Fremen uprising).</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={this.props.handleRestar}>Restart Game</Button>
            </Modal.Footer>
          </Modal>
          
          <Modal show={this.props.youLose}>
            <Modal.Title className="modalTitle modalLose">Baron Harkonnen Attacks!</Modal.Title>
            <Modal.Body>You failed to harvest enough spice, and the Emperor was unimpressed. Harkonnen forces made a surprise attack on Arakeen and slew the Duke. The web developer escaped in an ornithopter and began a new life as a wandering space adventurer.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={this.props.handleRestart}>Restart Game</Button>
            </Modal.Footer>
          </Modal>

        </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        applicationTimer: state.applicationTimer,
        youWin: state.youWin,
        youLose: state.youLose
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       makeUpdate: () => dispatch(recurUpdate()),
       handleRestart: () => { 
           dispatch(restart());
           dispatch(recurUpdate());
       }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);