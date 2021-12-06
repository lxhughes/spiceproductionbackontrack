import React from 'react';
import store from '../store';

class ActionButton extends React.Component {
    
    render(){
        
        let buttondata = this.props.buttondata;
        
        return (
            <div className="ActionButton">
               <button type="button" className="btn btn-primary" data-toggle="tooltip" title={buttondata.tooltip} onClick={buy}>{buttondata.name}</button>
            </div>
        );
    }
}

export default ActionButton;

/* Actions */
function buy(){
    
    const state = store.getState();
    
    if(state.profit >= 100000){
        store.dispatch({ type: 'profit/buyFrom' });
        store.dispatch({ type: 'harvesters/increment' });
    }
    else{
        console.log("Cannot buy; not enough profit");
    }
}