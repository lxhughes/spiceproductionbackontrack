import React, {Component} from 'react';

/* Components */
import Seconds from './Seconds'

class OverallValue extends React.Component {

    render(){
        let metricdata = this.props.metricdata;
        let val = 0; 
        
        // Get the main value: either "value" or a sum of the dataset values
        if(metricdata.value !== undefined){
            val = metricdata.value;
        }
        else if(metricdata.dataset !== undefined){
            val = metricdata.dataset.map(row => row.value).reduce(sum);
        }
    
        if(metricdata.randomize){
            val = randomNum(metricdata.min, metricdata.max);
        }

        if(metricdata.unit === "seconds"){

            return <Seconds startvalue={val} />;
        }

        // Format number
        if(!isNaN(val)){

            if(val > 1000000 || val < -1000000){
                val = (val/1000000).toFixed(0).toString() + "M";
            }
            else if(val > 1000 || val < -1000){
                val = (val/1000).toFixed(0).toString() + "K";
            }
            else {
                val = val.toLocaleString();
            }
        }
    
        return (
            <div className="numberContainer col-sm-3">
                <div className="numberAndUnit">
                    <div className="number">
                        { val }
                    </div>
                    <div className='unit'>{metricdata.unit}</div>
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

// Random number function
function randomNum(min, max){
    return Math.floor(Math.random() *  (max - min)) + min;
}