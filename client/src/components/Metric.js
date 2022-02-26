import React from 'react';

/* Components */
import ChartBar from './ChartBar'
import ChartStars from './ChartStars'
import ChartThermometer from './ChartThermometer'
import ChartTimer from './ChartTimer'
import ChartTrend from './ChartTrend'
import OverallValue from './OverallValue';
import ActionButton from './ActionButton';

class Metric extends React.Component {
    
    render(){
        
       let metricHTML = null;
        
        switch (this.props.metricdata.type){
        
            case "bar": metricHTML = (
                <ChartBar metricdata={this.props.metricdata} />
            );
                break;
            case "stars": metricHTML = (
                <ChartStars metricdata={this.props.metricdata} />
            );
                break;
            case "thermometer": metricHTML = (
                <ChartThermometer metricdata={this.props.metricdata} />
            ); 
                break;
            case "timer": metricHTML = (
                <ChartTimer metricdata={this.props.metricdata } />
            );
                break;
            case "trend": metricHTML = (
                <ChartTrend metricdata={this.props.metricdata} />
            );
                break;
            default: metricHTML = (
                <OverallValue metricdata={this.props.metricdata} />
            );
                break;
        }
        
         // Action buttons
        let actionbuttons = [];
        if(this.props.metricdata.actionButtons){
          for(var k=0; k<this.props.metricdata.actionButtons.length; k++){                
              
              // HTML of action button
              let button = (<li className='actionButtonItem' key={k}>
                        <ActionButton buttondata={this.props.metricdata.actionButtons[k]} />
                    </li>);
              actionbuttons.push(button);
          }
        }
        
        return (<div>
                { metricHTML }
                <ul className='actionButtons'>
                    { actionbuttons }
                </ul>
            </div>)
    }
}

export default Metric;