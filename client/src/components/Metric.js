import React from 'react';

/* Components */
import ChartStars from './ChartStars'
import ChartBar from './ChartBar'
import ChartTrend from './ChartTrend'
import ChartTimer from './ChartTimer'
import OverallValue from './OverallValue';

class Metric extends React.Component {
    
    render(){
        
        if(this.props.metricdata.type === "stars"){
            return (
                <ChartStars metricdata={this.props.metricdata} />
            );
            
        }
        else if(this.props.metricdata.type === "bar"){
            return (
                <ChartBar metricdata={this.props.metricdata} />
            );
        }

        else if(this.props.metricdata.type === "trend"){
            return (
                <ChartTrend metricdata={this.props.metricdata} />
            );
        }
        else if(this.props.metricdata.type === "timer"){
            return (
                <ChartTimer metricdata={this.props.metricdata } />
            );
        }
        else {
            return (
                <OverallValue metricdata={this.props.metricdata} />
            );
        }

    }
}

export default Metric;