import React from 'react';
import store from '../store';

class OverallValue extends React.Component {

    render(){
        let metricdata = this.props.metricdata;
        let val = 0; 
        let units = metricdata.unit;
        
        // Get the main value: either "value" or a sum of the dataset values
        if(metricdata.value !== undefined){
            val = metricdata.value;
        }
        else if(metricdata.valueStore !== undefined){
            const state = store.getState();
            val = state[metricdata.valueStore];
        }
        else if(metricdata.dataset !== undefined){
            val = metricdata.dataset.map(row => row.value).reduce(sum);
        }

        if(metricdata.unit === "seconds"){
              if(val >= 60) units = "minutes";
              if(val >= 3600) units = "hours";
        }
        
        // Remove S if the value is 1
        if(units.charAt(units.length-1) === "s"){
            if(val === 1) units = units.substr(0,units.length-1);
        }

        // Format number
        if(!isNaN(val)){

            if(val > 1000000 || val < -1000000){
                val = (val/1000000).toFixed(1).toString() + "M";
            }
            //else if(val > 1000 || val < -1000){
            //   val = (val/1000).toFixed(1).toString() + "K";
            //}
            else {
                val = val.toLocaleString();
            }
        }
        
        // If the maximum was met, set a class
        let maxMet = false;
        if(metricdata.max){
            if(val >= metricdata.max) maxMet = true;    
        }
    
        return (
            <div className={'numberContainer ${maxMet ? "maxmet" : "" }'}>
                <div className="numberAndUnit">
                    <div className="number">
                        { formatValue(val, metricdata.unit) }
                    </div>
                    <div className='unit'>{units}</div>
                </div>
            </div>
        );
    }
}

export default OverallValue;

/* Support Functions */

// Support function to sum
function sum(total, num){
    return total + num;
}

// Format
function formatValue(number, unit){
    if(unit === "seconds"){
        return fmtMSS(number);
    }
    
    return number;
}

// Format functions
function fmtMSS(s){
    return(s-(s%=60))/60+(9<s?':':':0')+s;
}