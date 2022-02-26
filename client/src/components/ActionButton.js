import React from 'react';
import store from '../store';

class ActionButton extends React.Component {
    
    render(){
        
        const buttondata = this.props.buttondata;
        
        // Decide when to disable the button
        let disabled = false;
        const state = store.getState();
        if(buttondata.cost >= state.profit) disabled = true;
        if(state.harvesters - state.safeHarvesters <= 0 && buttondata.action === "safe") disabled = true;  
        buttondata.disabled = disabled;
        
        // Set action
        let action = nullFunc;
        if(buttondata.action === "buy") action = buy;
        if(buttondata.action === "safe") action = safe;
        if(buttondata.action === "sell") action = sell;
         
        return (
            <div className="ActionButton">
               <button type="button" className="btn btn-dark" data-toggle="tooltip" title={buttondata.tooltip} onClick={action} disabled={buttondata.disabled}>{buttondata.name}</button>
            </div>
        );
    }
}

export default ActionButton;

/* Actions */
function nullFunc(){
    return true;
}

function buy(){

    const state = store.getState();
    
    if(state.profit <= 100000){
        console.log("Cannot buy new harvester; not enough money");
    }
    else{
        store.dispatch({ type: 'buy/harvester' });
        
    }
}

function safe(){
    
    const state = store.getState();
    
    if(state.profit <= 200000){
        console.log("Cannot buy armor; not enough money");
    }
    else if(state.harvesters - state.safeHarvesters <= 0){
        console.log("Cannot buy armor; no unarmored harvesters to armor")
    }
    else{
        store.dispatch({ type: 'buy/armor' });
    }
    
}

function sell(){
    
    const state = store.getState();
    
    store.dispatch({ type: 'sell/bank' });
    
}