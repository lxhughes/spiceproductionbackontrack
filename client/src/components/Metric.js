import React from 'react';

/* Components */
import ChartBar from './ChartBar'
import ChartStars from './ChartStars'
import ChartThermometer from './ChartThermometer'
import ChartTimer from './ChartTimer'
import ChartTrend from './ChartTrend'
import OverallValue from './OverallValue';

class Metric extends React.Component {
    
    render(){
        
        switch (this.props.metricdata.type){
        
            case "bar": return (
                <ChartBar metricdata={this.props.metricdata} />
            );
            case "stars": return (
                <ChartStars metricdata={this.props.metricdata} />
            );
            case "thermometer": return (
                <ChartThermometer metricdata={this.props.metricdata} />
            ); 
            case "timer": return (
                <ChartTimer metricdata={this.props.metricdata } />
            );
            case "trend": return(
                <ChartTrend metricdata={this.props.metricdata} />
            );
            default: return (
                <OverallValue metricdata={this.props.metricdata} />
            );
        }
    }
}

export default Metric;